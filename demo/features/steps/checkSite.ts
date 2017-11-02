import { Cucumber, Given, When } from '../../../lib/decorators'
import action from '../helpers/action';
import check from '../helpers/check';

@Cucumber
class checkSite {
    @Given(/^I open the (url|site) "([^"]*)?"$/)
    public openWebsite() {
        return action.Open;
    };

    @When(/^I expect that the title is( not)* "([^"]*)?"$/)
    public title() {
        return check.Title
    };
};

let CheckSite = new checkSite();
