import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController); //get the instance of a service
        service = TestBed.get(HeroService);
    });

    describe('getHero', () => {
        //it('should call get with the correct URL', inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
        it('should call get with the correct URL', () => {
            
            service.getHero(4).subscribe();

            const request = httpTestingController.expectOne('api/heroes/4');
            request.flush({id: 4, name: 'SuperDude', strength: 100});
            httpTestingController.verify();
        });
        
    });
    
});