import { Request } from "express"


interface IRequest extends Request{
    userId?:string
}

export default IRequest