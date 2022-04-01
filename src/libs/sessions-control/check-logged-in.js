export default function checkLoggedIn(ifNotLoggedInAction= ()=> false){
    const admin_key = localStorage.getItem('admin_key');
    if(!admin_key){
        return ifNotLoggedInAction();
    }
    else return true;
}