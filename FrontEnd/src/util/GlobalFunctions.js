export function is18OrOlder(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    
    const age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();
    
    // If the birth date hasn't occurred yet this year, subtract 1 from the age
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        return age - 1 >= 18;
    }
    
    return age >= 18;
}