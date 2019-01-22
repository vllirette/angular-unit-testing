import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;


    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24 },
            { id: 3, name: 'Iron Dude', strength: 55 }
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges(); //initialize the components (parent & child)
    });

    it('should render each hero as a HeroComponent', () => {
        //beforeEach -> heroService.getHeroes

        //detechChanges -> run ngOnInit()

        const heroComponentDebugEl = fixture.debugElement.queryAll(By.directive(HeroComponent)); //<app-hero> nodes
        expect(heroComponentDebugEl.length).toEqual(3);
        for (let i = 0; i < heroComponentDebugEl.length; i++) {
            expect(heroComponentDebugEl[i].componentInstance.hero).toEqual(HEROES[i]);

        }
    });

    it(`shoudl call heroService.deleteHero when the HeroComponent's 
        delete button is clicked`, () => {
            spyOn(fixture.componentInstance, 'delete');
            //beforeEach -> heroService.getHeroes

            //detechChanges -> run ngOnInit()

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent)); //<app-hero> nodes in html
            heroComponents[0].query(By.css('button'))
                .triggerEventHandler('click', { stopPropagation: () => { } });

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it(`shoudl call heroService.deleteHero when the HeroComponent's 
    delete event is emitted`, () => {
            spyOn(fixture.componentInstance, 'delete');
            //beforeEach -> heroService.getHeroes

            //detechChanges -> run ngOnInit()

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent)); //<app-hero> nodes in html
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
            //heroComponents[0].triggerEventHandler('delete', null); //debug element will emit the delete event

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add new hero to the hero list when the add button is clicked', () => {
        //beforeEach -> heroService.getHeroes
        //detechChanges -> run ngOnInit()
        const name = "Mr.Ice";
        mockHeroService.addHero.and.returnValue(of({id: 4, name: name, strength: 4}));
        let inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        
        //const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContext;
        //expect(heroText).toContain(name);
        // code from tuto ^ didn't work so replaced with the one below
        expect(fixture.componentInstance.heroes.length).toBe(4);
        expect(fixture.componentInstance.heroes[3].name).toBe(name);
    });



});