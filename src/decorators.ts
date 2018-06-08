import {Before, Given, When, Then, After} from 'cucumber';

export function cucumber(target: Function){
    for (const member in target.prototype) {
        target.prototype[member]();
    }
}

export function before(expression?: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => 
             {
                if (expression) {
                return Before(expression, assertion);
                } else {
                return Before(assertion);
                }
            };
        
        return descriptor;
    }
}

export function given(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => Given(expression,assertion);
        
        return descriptor;
    }
}

export function when(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => When(expression, assertion);

        return descriptor;
    }
}

export function then(expression: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () => Then(expression, assertion);

        return descriptor;
    }
}

export function after(expression?: any) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>){
        let assertion = descriptor.value;

        descriptor.value = () =>  {
                if (expression) {
                return After(expression, assertion);
                } else {
                return After(assertion);
                }
            };
        
        return descriptor;
    }
}