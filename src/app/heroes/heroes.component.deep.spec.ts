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

});