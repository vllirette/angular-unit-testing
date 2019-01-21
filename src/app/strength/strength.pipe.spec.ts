import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    it('should display weak if strength is 5', () => {
        let pipe = new StrengthPipe();

        //act & assert in one line
        expect(pipe.transform(5)).toEqual('5 (weak)');
    });

    it('should display string if strength is 10', () => {
        let pipe = new StrengthPipe();

        //act & assert in one line
        expect(pipe.transform(10)).toEqual('10 (strong)');

    });

    it('should display unbelivable if strength >= 20', () => {
        let pipe = new StrengthPipe();

        //act & assert in one line
        expect(pipe.transform(20)).toEqual('20 (unbelievable)');

    });
    
    
    
});