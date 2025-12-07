// Schedule data
const schedule = {
    'SENIN': [
        { time: '07:30-08:10', subject: 'B. Indo' },
        { time: '08:10-08:50', subject: 'B. Indo' },
        { time: '08:50-09:30', subject: 'English' },
        { time: '09:30-09:45', subject: 'Istirahat' },
        { time: '09:45-10:25', subject: 'English' },
        { time: '10:25-11:05', subject: 'Fisika' },
        { time: '11:05-11:45', subject: 'Fisika' },
        { time: '11:45-12:15', subject: 'Istirahat' },
        { time: '12:15-12:55', subject: 'S. Rupa' },
        { time: '12:55-13:35', subject: 'TIK' },
        { time: '13:35-14:15', subject: 'TIK' }
    ],
    'SELASA': [
        { time: '07:30-08:10', subject: 'Mandarin' },
        { time: '08:10-08:50', subject: 'Mandarin' },
        { time: '08:50-09:30', subject: 'B. Indo' },
        { time: '09:30-09:45', subject: 'Istirahat' },
        { time: '09:45-10:25', subject: 'Sejarah' },
        { time: '10:25-11:05', subject: 'Sejarah' },
        { time: '11:05-11:45', subject: 'English' },
        { time: '11:45-12:15', subject: 'Istirahat' },
        { time: '12:15-12:55', subject: 'English' },
        { time: '12:55-13:35', subject: 'Mate' },
        { time: '13:35-14:15', subject: 'Mate' }
    ],
    'RABU': [
        { time: '07:30-08:10', subject: 'Fisika' },
        { time: '08:10-08:50', subject: 'Fisika' },
        { time: '08:50-09:30', subject: 'Biologi' },
        { time: '09:30-09:45', subject: 'Istirahat' },
        { time: '09:45-10:25', subject: 'Biologi' },
        { time: '10:25-11:05', subject: 'PKN' },
        { time: '11:05-11:45', subject: 'PKN' },
        { time: '11:45-12:15', subject: 'Istirahat' },
        { time: '12:15-12:55', subject: 'Musik' },
        { time: '12:55-13:35', subject: 'Mate' },
        { time: '13:35-14:15', subject: 'Mate' }
    ],
    'KAMIS': [
        { time: '07:30-08:10', subject: 'Penjas' },
        { time: '08:10-08:50', subject: 'Penjas' },
        { time: '08:50-09:30', subject: 'Kimia' },
        { time: '09:30-10:10', subject: 'Kimia' },
        { time: '10:10-10:25', subject: 'Istirahat' },
        { time: '10:25-11:05', subject: 'Mate' },
        { time: '11:05-11:45', subject: 'Biologi' },
        { time: '11:45-12:25', subject: 'Biologi' }
    ],
    'JUMAT': [
        { time: '07:30-08:10', subject: 'Agama' },
        { time: '08:10-08:50', subject: 'Agama' },
        { time: '08:50-09:30', subject: 'Ekskul' },
        { time: '09:30-10:10', subject: 'Ekskul' },
        { time: '10:10-10:25', subject: 'Istirahat' },
        { time: '10:25-11:05', subject: 'Mate' },
        { time: '11:05-11:45', subject: 'Mandarin' },
        { time: '11:45-12:25', subject: 'Mandarin' }
    ],
    'SABTU': [
        { time: '07:30-08:10', subject: 'Kimia' },
        { time: '08:10-08:50', subject: 'Kimia' },
        { time: '08:50-09:30', subject: 'Mate' },
        { time: '09:30-10:10', subject: 'Mate' },
        { time: '10:10-10:25', subject: 'Istirahat' },
        { time: '10:25-11:05', subject: 'Mandarin' },
        { time: '11:05-11:45', subject: 'Mandarin' },
        { time: '11:45-12:25', subject: 'B. Indo' }
    ]
};

// Display schedule
function displaySchedule() {
    const container = document.getElementById('scheduleGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.keys(schedule).forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-schedule';
        
        const dayTitle = document.createElement('h2');
        dayTitle.className = 'day-title';
        dayTitle.textContent = day;
        dayDiv.appendChild(dayTitle);
        
        schedule[day].forEach(item => {
            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'schedule-time';
            timeSpan.textContent = item.time;
            
            const subjectSpan = document.createElement('span');
            subjectSpan.className = 'schedule-subject';
            subjectSpan.textContent = item.subject;
            
            scheduleItem.appendChild(timeSpan);
            scheduleItem.appendChild(subjectSpan);
            dayDiv.appendChild(scheduleItem);
        });
        
        container.appendChild(dayDiv);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', displaySchedule);
