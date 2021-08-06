import { InsertAfter } from "../Utility/Utility"

interface Props {
    id:string,
    labelText?:string,
    feedbackText?:(e:string)=>void | string | undefined,
    Uploaded:(e: File|string|null)=>void,
    format?:'file'|'base64',
    clear?:Boolean
}

const File = ({id,labelText='Upload',feedbackText,Uploaded,format='file',clear=true}: Props) => {

    const fileUploaderClickHandler =()=>{
        const uploader = document.getElementById(`${id}-uploader`)! as HTMLInputElement
        uploader.click()
    }

    const clearFeedback=()=>{
        const feedback = document.getElementById(`${id}-feedback`)! as HTMLDivElement;
        if(feedback) feedback.remove();
    }

    const clearHandler =()=>{
        const oldInput = document.getElementById(`${id}-uploader`)! as HTMLInputElement
        oldInput.value = '';
        clearFeedback();
        Uploaded(null);
    }

    const generateFeedback =(file:File)=>{
        const uploader = document.getElementById(`${id}-uploader`)! as HTMLInputElement
        clearFeedback();
        if(file){
            let newFeedback = document.createElement('div') as HTMLDivElement;
            newFeedback.id = `${id}-feedback`;
            newFeedback.classList.add('feedback');

            if(clear){
                let clearIcon = document.createElement('span') as HTMLSpanElement;
                clearIcon.classList.add('clear');
                clearIcon.innerHTML = 'X';
                clearIcon.addEventListener('click',clearHandler);
                newFeedback.appendChild(clearIcon);
            }

            let msg = document.createElement('span') as HTMLSpanElement;
            if(feedbackText){
                if(typeof(feedbackText) === "string"){
                    msg.innerHTML = `${feedbackText}: <u><b>${file.name}</b></u>.`
                } else {
                    msg.innerHTML = `${feedbackText(file.name)}`;
                }
            } else {
                msg.innerHTML = `File: <u><b>${file.name}</b></u>.`;
            }
           
            newFeedback.appendChild(msg);  

            if(uploader) InsertAfter(newFeedback, uploader);
        }

    }

    const changeHandler =(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(event){
            const reader = new FileReader();

            const target = event.target as HTMLInputElement;
            const files = target.files;

            if(files){
                const file = files[0];
                reader.readAsDataURL(file);

                reader.addEventListener('load', (event)=>{
                    if(event && event.target && event.loaded === event.total){

                        generateFeedback(file)
                       
                        if(format==='base64'){
                            let base64 = JSON.stringify(event.target.result);
                            base64 = base64.replace(
                                `data:${file.type};base64,`,
                                ""
                              );
                            Uploaded(base64);
                        } else {
                            Uploaded(file);
                        }
                    }
                })
            }
            
            
        }
    }
    return <>
        <input id={`${id}-button`} type='button' className='uploadFile' value={labelText} onClick={fileUploaderClickHandler} />
        <input type="file" id={`${id}-uploader`} hidden onChange={changeHandler} />
    </>
}
export default File