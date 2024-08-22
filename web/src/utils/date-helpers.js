export function getWeekDay(day){
    switch(day){
        case 0: return 'Sunday'; break;
        case 1: return 'Monday'; break;
        case 2: return 'Teusday'; break;
        case 3: return 'Wedensday'; break;
        case 4: return 'Thursday'; break;
        case 5: return 'Friday'; break;
        case 6: return 'Saturday'; break;
    }
}

export function getMonth(month){
    switch(month){
        case 0: return 'January'; break;
        case 1: return 'February'; break;
        case 2: return 'March'; break;
        case 3: return 'April'; break;
        case 4: return 'May'; break;
        case 5: return 'June'; break;
        case 6: return 'July'; break;
        case 7: return 'August'; break;
        case 8: return 'September'; break;
        case 9: return 'October'; break;
        case 10: return 'November'; break;
        case 11: return 'December'; break;
    }
}

export function  getDay(day){
    if(day === 1 || day === 21 || day === 31){ return `${day}st`; }
    else if(day === 2 || day === 22){ return `${day}nd`; }
    else if(day === 3 || day === 23){ return `${day}rd`; }
    else{ return `${day}th`; }
}

export function getTime(hours, minutes){
    let hour = 0,
        minuteString = '',
        period = '';

    if(hours > 0 && hours <= 11){ hour = hours; period = 'am'; }
    else{
        period = 'pm';
        switch(hours){
            case 12: hour = 12; break;
            case 13: hour = 1; break;
            case 14: hour = 2; break;
            case 15: hour = 3; break;
            case 16: hour = 4; break;
            case 17: hour = 5; break;
            case 18: hour = 6; break;
            case 19: hour = 7; break;
            case 20: hour = 8; break;
            case 21: hour = 9; break;
            case 22: hour = 10; break;
            case 23: hour = 11; break;
            case 0: hour = 12; break;

        }
    }
    if(minutes > 0){
        if(minutes < 10){ minuteString = `0${minutes}`; }
        else{ minuteString = `${minutes}`; }
    }
    return`${hour}${minuteString.length > 0 ? `:${minuteString}` : ''}${period}`;
}