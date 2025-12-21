// Birthday page logic
const birthdays = [
    { name: "Kendrick wilston", date: "2009-9-29"},
    { name: "Jessica Sachi", date: "2009-11-18" },
    { name: "Kusumo Wijaya", date: "2009-10-10" },
    { name: "James Willard Chen", date: "2009-10-14" },
    { name: "Reegan", date: "2009-09-06" },
    { name: "Joice Kwan", date: "2009-08-14" },
    { name: "Richard Ansle", date: "2009-05-19" },
    { name: "Zenji", date: "2009-02-02" },
    { name: "Justin Kwok", date: "2009-07-26" },
    { name: "Gabriella", date: "2009-11-16" },
    { name: "Lorenzo", date: "2009-11-12" },
    { name: "Michelle", date: "2009-12-08" },
    { name: "Carissa", date: "2009-05-15" },
    { name: "Celine Cen", date: "2009-12-20" },
    { name: "Fiona", date: "2009-08-07" },
    { name: "Stella", date: "2009-08-28" },
    { name: "Janice", date: "2009-03-11" },
    { name: "Fleishia", date: "2009-11-08" },
    { name: "Giselle Lee", date: "2009-11-10" },
    { name: "Valencia", date: "2009-06-28" },
    { name: "Idellia", date: "2009-07-27" },
    { name: "Jessica Tanji", date: "2009-09-02" },
    { name: "Carlin Fayola", date: "2009-10-08" },
    { name: "Erich", date: "2009-11-17" },
    { name: "Celine Siera", date: "2009-05-01" },
    { name: "Wendy", date: "2009-12-05" },
    { name: "Joe Kusanagi", date: "2009-04-17" },
    { name: "Louis", date: "2008-12-18" },
    { name: "Felix", date: "2008-09-27" },
    { name: "Kenrick", date: "2009-04-11" },
    { name: "Nico Wiman", date: "2009-03-14" },
    { name: "Florencia", date: "2009-01-01" },
    { name: "Marcus", date: "2009-10-20" },
    { name: "Grace", date: "2009-08-29" },
    { name: "Roschella", date: "2009-06-03" },
    { name: "Luis", date: "2010-02-02" },
    { name: "Derick", date: "2009-11-30" },
    { name: "Goldy", date: "2009-03-15" },
    { name: "Jose", date: "2009-09-09" },
    { name: "Filbert", date: "2009-05-29" },
    { name: "Valerian", date: "2009-09-24" },
    { name: "Javier", date: "2009-08-17" },
    { name: "Ella", date: "2009-12-03" },
    { name: "Jocelyn", date: "2009-12-10" },
    { name: "Ashwini", date: "2009-09-11" },
    { name: "anjes[the legend]", date:"2008-08-23"}
];

// Calculate days until birthday (considering 7 days before)
function getDaysUntilBirthday(birthdayDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [year, month, day] = birthdayDate.split('-').map(Number);
    const thisYear = new Date(today.getFullYear(), month - 1, day);
    const nextYear = new Date(today.getFullYear() + 1, month - 1, day);
    
    let targetDate = thisYear;
    if (thisYear < today) {
        targetDate = nextYear;
    }
    
    const daysDiff = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));
    return daysDiff;
}

// Display birthdays
function displayBirthdays() {
    const container = document.getElementById('birthdayList');
    if (!container) return;
    
    // Filter only birthdays within 7 days (0-7 days)
    const upcomingBirthdays = birthdays.map(b => ({
        ...b,
        daysUntil: getDaysUntilBirthday(b.date)
    })).filter(b => b.daysUntil >= 0 && b.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil);
    
    container.innerHTML = '';
    
    if (upcomingBirthdays.length === 0) {
        container.innerHTML = '<div class="birthday-card" style="text-align: center; padding: 2rem;"><div class="birthday-name">No upcoming birthdays in the next 7 days</div></div>';
        return;
    }
    
    upcomingBirthdays.forEach(birthday => {
        const card = document.createElement('div');
        card.className = 'birthday-card';
        card.classList.add('upcoming');
        
        const [year, month, day] = birthday.date.split('-');
        const dateObj = new Date(year, month - 1, day);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });
        
        let daysText = '';
        if (birthday.daysUntil === 0) {
            daysText = '<div class="days-until">🎉 TODAY! 🎉</div>';
        } else if (birthday.daysUntil > 0 && birthday.daysUntil <= 7) {
            daysText = `<div class="days-until">${birthday.daysUntil} day${birthday.daysUntil > 1 ? 's' : ''} until birthday!</div>`;
        }
        
        card.innerHTML = `
            <div class="birthday-name">${birthday.name}</div>
            <div class="birthday-date">${formattedDate}</div>
            ${daysText}
        `;
        
        container.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', displayBirthdays);
