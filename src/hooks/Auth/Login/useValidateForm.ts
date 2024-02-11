import { useEffect, useState } from "react";
type validateFormPropsType = {

}
const validateForm = (formData : FormData | null)=>{
    if(formData){
        if(formData.get('username')!.toString().length > 3 && formData.get('password')){
            return true
        }
    }
    return false
}
const useValidateForm = (props : validateFormPropsType)=>{
 const [formData , setFormData ] = useState<FormData | null>(null)
 useEffect(()=>{
        validateForm(formData)
    },[formData]
     
        
 formData?.append('username' , 'test')
 formData?.append('password' , 'test')
}