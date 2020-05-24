import Big from 'big.js'
import isNumber from './isNumber'
import operate from './operate'

export default function calculate(obj, buttonName){
    if (buttonName === 'AC'){
        return {
            total: null,
            next: null,
            operation: null,
        }
    }

    if (isNumber(buttonName)){
        if (buttonName === '0' && obj.next === '0'){
            return {}
        }
        // if there is an operation, update next.
        if (obj.operation){
            if (obj.next){
                return { next:obj.next + buttonName }
            }
            return { next: buttonName }
        }
        // if there isn't an operation, update next && clear value
        if (obj.next){
            const next = obj.next === '0' ? buttonName : obj.next + buttonName
            return {
                next,
                total: null,
            }
        }
        return {
            next: buttonName,
            total: null,
        }
    }

    if (buttonName ==='%'){
        if (obj.operation && obj.next){
            const result = operate(obj.total, obj.next, obj.operation)
            return {
                total: Big(result)
                    .div(Big("100"))
                    .toString(),
                next: null,
                operation: null,
            }
        }
        if (obj.next){
            return {
                next: Big(obj.next)
                    .div(Big("100"))
                    .toString(),
            }
        }
        return {}
    }

    if (buttonName === '.'){
        if (obj.next){
            // ignore . if next number already has a "."
            if (obj.next.includes('.')){
                return {}
            }
            return { next: obj.next + '.'}
        }
        return { next: '0.' }
    }

    if (buttonName === '='){
        if (obj.next && obj.operation){
            return {
                total: operate(obj.total, obj.next, obj.operation),
                next: null,
                operation: null,
            }
        } else {
            //clicking = with no operation does nothing. 
            return {}
        }
    }

    if (buttonName === '+/-'){
        if (obj.next){
            return { next: (-1 * parseFloat(obj.next)).toString() }
        }
        if (obj.total){
            return { total: (-1 * parseFloat(obj.total)).toString() }
        }
        return {}
    }
    // if user presses an operation button while there is an existing operation.
    if (obj.operation){
        return {
            total: operate(obj.total, obj.next, obj.operation),
            next: null,
            operation: buttonName,
        }
    }

    if (!obj.next){
        return { operation: buttonName };
    }

    return {
        total: obj.next,
        next: null,
        operation: buttonName,
    }
}