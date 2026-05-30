const talksData = [
    {
        title: "Introduction to Generative AI",
        speakers: ["Alice Wonderland"],
        category: ["AI", "Machine Learning"],
        duration: 60, // minutes
        description: "An overview of generative AI, its applications, and future trends."
    },
    {
        title: "Effective Prompt Engineering",
        speakers: ["Bob The Builder", "Charlie Chaplin"],
        category: ["AI", "Prompt Engineering"],
        duration: 60,
        description: "Learn the art and science of crafting effective prompts for large language models."
    },
    {
        title: "Building Scalable Microservices with Node.js",
        speakers: ["David Developer"],
        category: ["Backend", "Node.js", "Microservices"],
        duration: 60,
        description: "A deep dive into designing and implementing scalable microservices using Node.js and Express."
    },
    {
        title: "Frontend Frameworks: React vs Vue",
        speakers: ["Eve Evolution"],
        category: ["Frontend", "JavaScript"],
        duration: 60,
        description: "A comparative analysis of popular frontend frameworks, focusing on React and Vue.js."
    },
    {
        title: "DevOps Best Practices for Cloud Deployments",
        speakers: ["Frank Deployer"],
        category: ["DevOps", "Cloud", "Automation"],
        duration: 60,
        description: "Explore essential DevOps practices and tools for seamless cloud deployments."
    },
    {
        title: "Security in Modern Web Applications",
        speakers: ["Grace Hacker"],
        category: ["Security", "Web Development"],
        duration: 60,
        description: "Understanding common web vulnerabilities and how to build secure web applications."
    }
];

const eventStartTime = new Date();
eventStartTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

let currentTime = new Date(eventStartTime);
let schedule = [];

talksData.forEach((talk, index) => {
    const talkStartTime = new Date(currentTime);
    const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

    schedule.push({
        ...talk,
        startTime: talkStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: talkEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    currentTime = new Date(talkEndTime.getTime() + 10 * 60 * 1000); // 10 minutes transition

    // Insert lunch break after the 3rd talk
    if (index === 2) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour lunch

        schedule.push({
            title: "Lunch Break",
            isBreak: true,
            startTime: lunchStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        currentTime = new Date(lunchEndTime);
        // Add another 10 min transition after lunch
        currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000);
    }
});

const generateHtml = (scheduleData) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Event Schedule</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 960px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #0056b3;
            margin-bottom: 30px;
        }
        .search-container {
            margin-bottom: 20px;
            text-align: center;
        }
        .search-container input {
            padding: 10px;
            width: 80%;
            max-width: 400px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        .schedule {
            display: grid;
            gap: 20px;
        }
        .talk-card {
            background-color: #e9f5ff;
            border: 1px solid #cce0ff;
            border-radius: 8px;
            padding: 15px 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s;
        }
        .talk-card:hover {
            transform: translateY(-3px);
        }
        .talk-card.break {
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            text-align: center;
            font-style: italic;
            color: #666;
            padding: 20px;
        }
        .talk-time {
            font-weight: bold;
            color: #0056b3;
            margin-bottom: 10px;
            display: block;
            font-size: 1.1em;
        }
        .talk-title {
            font-size: 1.4em;
            margin-top: 0;
            margin-bottom: 10px;
            color: #003d80;
        }
        .talk-speakers {
            font-style: italic;
            color: #555;
            margin-bottom: 5px;
        }
        .talk-category {
            font-size: 0.9em;
            color: #007bff;
            margin-bottom: 10px;
        }
        .talk-category span {
            background-color: #e0f2f7;
            padding: 3px 8px;
            border-radius: 3px;
            margin-right: 5px;
            display: inline-block;
            margin-top: 5px;
        }
        .talk-description {
            font-size: 1em;
            line-height: 1.5;
        }
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                padding: 15px;
            }
            .search-container input {
                width: 95%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tech Talks Event Schedule</h1>

        <div class="search-container">
            <input type="text" id="categorySearch" placeholder="Search by category (e.g., AI, Node.js)">
        </div>

        <div id="schedule" class="schedule">
            <!-- Schedule will be rendered here by JavaScript -->
        </div>
    </div>

    <script>
        const allTalks = ${JSON.stringify(scheduleData)}; // Embed data directly

        function renderSchedule(talksToRender) {
            const scheduleDiv = document.getElementById('schedule');
            scheduleDiv.innerHTML = ''; // Clear previous content

            talksToRender.forEach(item => {
                if (item.isBreak) {
                    scheduleDiv.innerHTML += \`
                        <div class="talk-card break">
                            <span class="talk-time">\${item.startTime} - \${item.endTime}</span>
                            <h2 class="talk-title">\${item.title}</h2>
                        </div>
                    \`;
                    } else {
                    scheduleDiv.innerHTML += \`
                        <div class="talk-card">
                            <span class="talk-time">\${item.startTime} - \${item.endTime}</span>
                            <h3 class="talk-title">\${item.title}</h3>
                            <p class="talk-speakers">Speakers: \${item.speakers.join(', ')}</p>
                            <p class="talk-category">Categories: \${item.category.map(cat => \`<span>\${cat}</span>\`).join('')}</p>
                            <p class="talk-description">\${item.description}</p>
                        </div>
                    \`;
                }
            });
        }

        // Initial render
        renderSchedule(allTalks);

        // Search functionality
        document.getElementById('categorySearch').addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredTalks = allTalks.filter(item => {
                if (item.isBreak) return true; // Always show breaks
                return item.category.some(cat => cat.toLowerCase().includes(searchTerm));
            });
            renderSchedule(filteredTalks);
        });
    </script>
</body>
</html>
    `;
};

// Node.js file system module
const fs = require('fs');

// Generate the HTML content
const htmlContent = generateHtml(schedule);

// Write the content to index.html
fs.writeFile('index.html', htmlContent, (err) => {
    if (err) {
        console.error('Error writing index.html:', err);
    } else {
        console.log('index.html generated successfully!');
    }
});
