import {defineSupportCode} from 'cucumber';

export function Cucumber(target: Function){
    for (const member in target.prototype) {
        target.prototype[member]();
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