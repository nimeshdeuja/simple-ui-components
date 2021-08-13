import './Autocomplete.css';
import { ShortArray, InsertAfter } from '../Utility/Utility';

// type listTypes ={label:string, id:string|number, icon?:string, color?:string}
type listTypes = any
type changeTypes = (e:listTypes[])=>void

interface AutocompleteProps {
    list:listTypes[],
    id:string
    change:changeTypes,
    value?:listTypes[],
    placeholder?:string,
    inputPlaceholder?:string,
    emptyText?:string,
    multiple?:boolean,
    clear?:boolean,
    selectedCallback?:boolean,
    secondaryOption?:string
}
const Autocomplete = ({list, id, change, value=[],placeholder='Select',inputPlaceholder='Search',emptyText='List is empty',multiple=true,clear=false,selectedCallback=false,secondaryOption}:AutocompleteProps) => {
    let current = {
        selected: value as listTypes[],
        list: list as listTypes[],
        fullList: list as listTypes[],
        search:'' as string
    }

    const changeHandler = () => change(current.selected)

    if(value && selectedCallback) changeHandler();

    const clearAllHide =(type:'add'|'hide')=>{
        let clearAllElement = document.getElementById(id+'clearAll')! as HTMLSpanElement;
        if(clear){
            if(type === 'hide'){
                if(current.selected.length===0) clearAllElement.classList.add('hide');
            } else {
                if(current.selected.length>0) clearAllElement.classList.remove('hide');
            }
        }
        
    }

    const deleteClickEvent = (clicked:listTypes)=>{
        let listForSelected = []
        if(current.selected.length>0){
            for (let select of current.selected){
                if(select.id !== clicked.id){
                    listForSelected.push(select);
                }
            }
        }
        current.selected = listForSelected;
        generateSelectedOption();

        // filter option list
        current.list.push(clicked);
        generateOptionList();

        clearAllHide('hide');
        
        changeHandler();

    }

    const generateClearAllIcon =()=>{
        let element = document. getElementById(id+'clearAll') as HTMLSpanElement;
        if(!element){
            let searchBox = document.getElementById(id+'search') as HTMLDivElement;
            if(clear){
                let clearAllElement = document.createElement('span');
                clearAllElement.classList.add('clearAll');
                if(current.selected.length === 0) clearAllElement.classList.add('hide');
                clearAllElement.setAttribute('id', id+'clearAll');
                clearAllElement.innerHTML = 'X';
                clearAllElement.addEventListener('click', clearAllHandler);
                if(searchBox) InsertAfter(clearAllElement, searchBox);
            }
        }
    }

    const selectClickEvent = (clicked:listTypes)=>{
        if(multiple){
            current.selected.push(clicked);
        } else {
            current.selected = [clicked];
            closeOptionOnBlanketClick();
        }
        generateSelectedOption();
        
        let listForOption = [];
        let currentList = current.fullList;
        if(multiple) currentList = current.list;
        if(currentList.length>0){
            for (let option of currentList){
                if(option.id !== clicked.id){
                    listForOption.push(option);
                }
            }
        }
        current.list = listForOption;
        generateOptionList();
        generateClearAllIcon();
        clearAllHide('add');
        changeHandler();
    }

    const generateSelectedOption =()=>{
        let selectedElement = document.getElementById(id+'selected')! as HTMLDivElement;
        selectedElement.innerHTML = '';

        let ulElement = document.createElement("ul") as HTMLUListElement;
        if(current.selected.length>0){
            for (let item of current.selected){
                let liElement = document.createElement("li") as HTMLLIElement;
                liElement.classList.add('selected');
                liElement.setAttribute('data-testid','test-selected-li');
                if(!multiple)liElement.classList.add('single');
                if(item.icon){
                    let iconWrapper = document.createElement("div") as HTMLDivElement;
                    if(item.color) iconWrapper.style.backgroundColor = item.color;
                    let iconElement = document.createElement("img") as HTMLImageElement;
                    iconElement.setAttribute('src', item.icon);
                    iconElement.setAttribute('alt', item.label);
                    iconWrapper.append(iconElement)
                    liElement.append(iconWrapper);
                } else {
                    liElement.classList.add('noIcon');
                }
                let spanElement = document.createElement("span") as HTMLLIElement;
                spanElement.append(item.label);
                if(secondaryOption){
                    let spanElementSecondary = document.createElement("span") as HTMLLIElement;
                    spanElementSecondary.className = 'secondary'
                    spanElementSecondary.append(item[secondaryOption]);
                    spanElement.append(spanElementSecondary);
                }
                liElement.append(spanElement);
                if(multiple)liElement.addEventListener("click", ()=>deleteClickEvent(item));
                ulElement.append(liElement);
            }
        } else {
            let liElement = document.createElement("li") as HTMLLIElement;
            liElement.classList.add('notSelected');
            liElement.setAttribute('data-testid','test-selected-li');
            liElement.innerText = `${placeholder}`;
            ulElement.append(liElement);
        }
        selectedElement.append(ulElement);
    }

    const generateEmptyList =()=>{
        let emptyElement = document.createElement("li") as HTMLLIElement;
            emptyElement.setAttribute('data-testid','test-search-list-li');
            emptyElement.classList.add('isEmpty');
            emptyElement.innerText = emptyText;
            return emptyElement
    }

    const generateOptionList =()=>{
        let listElement = document.getElementById(id+'list')! as HTMLInputElement;
        listElement.innerHTML = ''

        let list = current.list;
        list = ShortArray(list, "ASC", "label");

        let ulElement = document.createElement("ul") as HTMLUListElement;

        if(current.search){
            list = list.filter((item:listTypes)=>{
                let search = current.search
                search = search.toUpperCase();
                let text = item.label.toUpperCase();
                let items = text.includes(search);
                if (!items && secondaryOption) {
                    let textSecondary = item[secondaryOption].toUpperCase();
                    items = textSecondary.includes(search);
                }
                return items;
            })
        }
        if(list.length>0){
            for (let item of list){
                let liElement = document.createElement("li") as HTMLLIElement;
                liElement.setAttribute('data-testid','test-search-list-li');
                if(item.icon){
                    let iconWrapper = document.createElement("div") as HTMLDivElement;
                    if(item.color) iconWrapper.style.backgroundColor = item.color;

                    let iconElement = document.createElement("img") as HTMLImageElement;
                    iconElement.setAttribute('src', item.icon);
                    iconElement.setAttribute('alt', item.label);
                    
                    iconWrapper.append(iconElement);
                    liElement.append(iconWrapper);
                }
                let spanElement = document.createElement("span") as HTMLLIElement;
                spanElement.append(item.label);
                if(secondaryOption){
                    let spanElementSecondary = document.createElement("span") as HTMLLIElement;
                    spanElementSecondary.className = 'secondary'
                    spanElementSecondary.append(item[secondaryOption]);
                    spanElement.append(spanElementSecondary);
                }
                liElement.append(spanElement);
                liElement.addEventListener("click", ()=>selectClickEvent(item));
                ulElement.append(liElement);
            }
        } else {
            ulElement.append(generateEmptyList());
        }
        listElement.append(ulElement);
    }

    const closeOptionOnBlanketClick = ()=>{
        let searchBox = document.getElementById(id+'search')! as HTMLDivElement;
        let inputElement = document.getElementById(id)! as HTMLInputElement;
        let blanketElement = document.getElementById(id+'blanket')! as HTMLDivElement;
        searchBox.style.display = 'none';
        blanketElement.remove();

        inputElement.value ='';
        current.search = '';
    }

    const generateBlanket=()=>{
        let divElement = document.createElement("div") as HTMLDivElement;
        let blanketE = document.getElementById(`${id}blanket`);

        let searchBox = document.getElementById(`${id}search`);
        if(!blanketE){
            divElement.classList.add('blanket');
            divElement.setAttribute("id", `${id}blanket`);
            divElement.addEventListener("click", ()=>closeOptionOnBlanketClick());
            if(searchBox) InsertAfter(divElement, searchBox);
        }
    }

    const filterOptionsList =()=>{
        if(current.selected.length<list.length){
            return list.filter((elem) => !current.selected.find(({ id }) => elem.id === id));
        } else if(current.selected.length === list.length){
            return []
        }
        return current.list
    }

    const clickOpenListHandler = ()=>{

        // UnHide Search Box
        let searchBox = document.getElementById(id+'search')! as HTMLDivElement;
        searchBox.style.display = 'block'
        
        // generate Blanket
        generateBlanket();
   
        let inputElement = document.getElementById(id)! as HTMLInputElement;
        inputElement.focus();
        
        if(current.selected.length>0) current.list = filterOptionsList()
        generateOptionList()
    }

    const filterSearch = (event:React.ChangeEvent<HTMLInputElement>) =>{
        current.search = event.target.value;
        generateOptionList()
    }

    const clearAllHandler =()=>{
       current.selected = []
       generateSelectedOption();

       current.list = list
       generateOptionList();
       changeHandler();

       clearAllHide('hide');
    }

    if(current.selected.length>0) generateClearAllIcon()

    return (
        <>
            <div id={id+'selected'} data-testid='test-selected' className='selected' onClick={clickOpenListHandler}>
                <ul data-testid='test-selected-ui'>{current.selected.length>0 ? current.selected.map((item:listTypes, i:number)=>{
            let iconE = <div><img src={item.icon} /></div>
            if(item.color) iconE = <div style={{backgroundColor:item.color}}><img src={item.icon} /></div>;
            return <li key={i} data-testid='test-selected-li' className={`selected ${multiple?'':'single'} ${!item.icon}'noIcon':''`} onClick={()=>multiple && deleteClickEvent(item)}>{item.icon && iconE}{item.label}</li>
        }) : <li className='notSelected' data-testid='test-selected-li'>{placeholder}</li>}</ul>
            </div>
            <div className='search' id={id+'search'} data-testid='test-search' style={{display:'none'}}>
                <input type='text' placeholder={inputPlaceholder} id={id} data-testid='test-search-input' onChange={filterSearch} />
                <div id={id+'list'} data-testid='test-search-list'></div>
            </div>
            {clear && current.selected.length>0 && <span id={id+'clearAll'} data-testid='test-clearAll' className='clearAll' onClick={clearAllHandler}>X</span>}
        </>
    )
}

export default Autocomplete
