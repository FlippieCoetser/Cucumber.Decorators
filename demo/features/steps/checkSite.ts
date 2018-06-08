import { cucumber, before, given, when, then, after } from '../../../lib/decorators'
import action from '../helpers/action';
import check from '../helpers/check';

@cucumber
class checkSite {
    @before("@Test")
    public before() {
        console.log('Test before feature with Tag @Test')
    }
    @given(/^I open the (url|site) "([^"]*)?"$/)
    public openWebsite(type: string, page: string) {
        action.Open(type, page);
    };

    @then(/^I expect that the title is( not)* "([^"]*)?"$/)
    public title(falseCase, expectedTitle) {
        check.Title(falseCase, expectedTitle)
    };

    @after("@Test")
    public after() {
        console.log('Test after feature with Tag @Test')
    }
};

let CheckSite = new checkSite();
