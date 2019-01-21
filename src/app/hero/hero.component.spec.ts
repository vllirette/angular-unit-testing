import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }); //creates a module specific for testing (replaces AppModule)
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    });
    
    it('should render the hero name in an <a> tag', () => {
        fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toContain('SuperDude');

        //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
    
});