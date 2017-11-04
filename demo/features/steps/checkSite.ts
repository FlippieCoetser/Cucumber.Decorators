import { Cucumber, Given, When, Then } from '../../../lib/decorators'
import action from '../helpers/action';
import check from '../helpers/check';

@Cucumber
class checkSite {
    @Given(/^I open the (url|site) "([^"]*)?"$/)
    public openWebsite(type: string, page: string) {
        action.Open(type, page);
    };

    @Then(/^I expect that the title is( not)* "([^"]*)?"$/)
    public title(falseCase, expectedTitle) {
        check.Title(falseCase, expectedTitle)
    };
};

let CheckSite = new checkSite();
