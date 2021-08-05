import { UpdateObject, UpdateArray, ShortArray, GetIndexBy, ShortNameGenerate } from './Utility';
describe('Hooks Function testing', function () {
    it('UpdateObject', function () {
        expect(UpdateObject({ name: 'Nimesh' }, { age: 32, name: 'Nimesh deuja' })).toEqual({ "age": 32, "name": "Nimesh deuja" });
    });
    it('UpdateArray', function () {
        expect(UpdateArray([1, 2, 3], { name: 'Nimesh' })).toEqual([1, 2, 3, { "name": "Nimesh" }]);
        expect(UpdateArray([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
    });
    it('ShortArray', function () {
        var test = [{ name: 'a' }, { name: 'c' }, { name: 'b' }];
        var test1 = [1, 3, 2];
        var test2 = ['a', 'c', 'b'];
        var test3 = [{ name: 1 }, { name: 3 }, { name: 2 }];
        expect(ShortArray(test, undefined, 'name')).toEqual([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);
        expect(ShortArray(test, 'DESC', 'name')).toEqual([{ name: 'c' }, { name: 'b' }, { name: 'a' }]);
        expect(ShortArray(test1, undefined)).toEqual([1, 2, 3]);
        expect(ShortArray(test1)).toEqual([1, 2, 3]);
        expect(ShortArray(test2)).toEqual(['a', 'b', 'c']);
        expect(ShortArray(test2, undefined)).toEqual(['a', 'b', 'c']);
        expect(ShortArray(test2, 'DESC')).toEqual(['c', 'b', 'a']);
        expect(ShortArray(test3)).toEqual([{ name: 1 }, { name: 3 }, { name: 2 }]);
        expect(ShortArray(test3, 'DESC', 'name')).toEqual([{ name: 3 }, { name: 2 }, { name: 1 }]);
        expect(ShortArray(test3, undefined, 'name')).toEqual([{ name: 1 }, { name: 2 }, { name: 3 }]);
        expect(ShortArray(test3, 'ASC', 'name')).toEqual([{ name: 1 }, { name: 2 }, { name: 3 }]);
    });
    it('GetIndexBy', function () {
        var test = [{ name: 'a' }, { name: 'c' }, { name: 'b' }];
        var test2 = [1, 3, 2];
        var test3 = ['a', 'c', 'b'];
        expect(GetIndexBy(test, 'a', 'name')).toEqual(0);
        expect(GetIndexBy(test, 'a')).toEqual(-1);
        expect(GetIndexBy(test2, 3)).toEqual(1);
        expect(GetIndexBy(test3, 'b')).toEqual(2);
    });
    it('ShortNameGenerate', function () {
        var name = 'Nimesh Deuja';
        var name1 = 'Nimesh Deuja Edit';
        var name2 = 'Nimesh';
        expect(ShortNameGenerate(name)).toEqual('ND');
        expect(ShortNameGenerate(name1)).toEqual('NE');
        expect(ShortNameGenerate(name2)).toEqual('NI');
    });
});
//# sourceMappingURL=Utility.test.js.map