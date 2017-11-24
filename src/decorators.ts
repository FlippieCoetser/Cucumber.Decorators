import {defineSupportCode} from 'cucumber';

export function Cucumber(target: Function){
    for (const member in target.prototype) {
        target.prototype[member]();
    }
}

export function Before(expression?: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => 
            defineSupportCode(({ Before }) => {
                if (expression) {
                Before(expression, assertion);
                } else {
                Before(assertion);
                }
            });
        
        return descriptor;
    }
}

export function Given(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => 
            defineSupportCode(({ Given }) => {
                Given(expression,assertion);
            });
        
        return descriptor;
    }
}

export function When(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => 
            defineSupportCode(({ When }) => {
                When(expression, assertion);
            });

        return descriptor;
    }
}

export function Then(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => 
            defineSupportCode(({ Then }) => {
                Then(expression, assertion);
            });

        return descriptor;
    }
}

export function After(expression?: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => 
            defineSupportCode(({ After }) => {
                if (expression) {
                After(expression, assertion);
                } else {
                After(assertion);
                }
            });
        
        return descriptor;
    }
}