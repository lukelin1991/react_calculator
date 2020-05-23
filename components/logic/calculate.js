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


}