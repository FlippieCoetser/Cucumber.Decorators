# Cucumber.Decorators
Typescript Decorators for Cucumber Tests


## Cucumber Example
#### Feature File
```
Feature: Local server test
    As a developer
    I want check the web site

    Background:
        Given I open the url "http://www.google.com"

    Scenario: Google
        Then I expect that the title is "Google"
```

#### Typescript Step File
```typescript
import { Cucumber, Given, When } from '../decorator/decorator'
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
```

### Run Example
`NPM Install`
`NPM run build`
`NPM run demo`

#### Explanation
The `Cucumber` Decorator updates the class constuctor to ensure each method within the class is executed during instantiation.

```typescript
export function Cucumber(target: Function){
    for (var member in target.prototype) {
        target.prototype[member]();
    }
}

```

The `Given` Decorator wraps the provided method and passes the expression into the required cucumber function.

```typescript
export function Given(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value();

        descriptor.value = () => 
            defineSupportCode(({ Given }) => {
                Given(expression,assertion);
            });
        
        return descriptor;
    }
}

```

Note: the `When` Decorator operates in a similar fastion as the `Given` Decorator.
