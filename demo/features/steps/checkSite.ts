import { Cucumber, Before, Given, When, Then, After } from '../../../lib/decorators'
import action from '../helpers/action';
import check from '../helpers/check';

@Cucumber
class checkSite {
    @Before("@Test")
    public before() {
        console.log('Test before feature with Tag @Test')
    }
    @Given(/^I open the (url|site) "([^"]*)?"$/)
    public openWebsite(type: string, page: string) {
        action.Open(type, page);
    };

    @Then(/^I expect that the title is( not)* "([^"]*)?"$/)
    public title(falseCase, expectedTitle) {
        check.Title(falseCase, expectedTitle)
    };

    @After("@Test")
    public after() {
        console.log('Test after feature with Tag @Test')
    }
};

let CheckSite = new checkSite();
