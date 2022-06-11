import User from "./User";

export default interface Repository {
   readonly id: number,
   readonly name: string,
   readonly full_name: string,  
   readonly url: string,
   readonly private: false,
   readonly description: string, 
   readonly fork: false,
   readonly owner: User,
   readonly default_branch: string
}