import { Cucumber, Given, When, Then } from '../../../lib/decorators'
import action from '../helpers/action';
import check from '../helpers/check';

@Cucumber
class checkSite {
    @Given(/^I open the (url|site) "([^"]*)?"$/)
    public openWebsite() {
        return action.Open;
    };

    @Then(/^I expect that the title is( not)* "([^"]*)?"$/)
    public title() {
        return check.Title
    };
};

let CheckSite = new checkSite();
