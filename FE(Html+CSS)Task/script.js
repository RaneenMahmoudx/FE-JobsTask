let allData = [];
fetch('http://localhost:8000/jobs') // json-server --watch jobs.json --port 8000 to run the server on Terminal
    .then(function(response){
         return response.json();
    })
    .then(function (jobs) {
        allData = Object.values(jobs); // convert object to array to use filter function later
        appendData(jobs);

    })
    .catch(function (err) {
        console.log(err);
    }); 

function appendData(jobs){
    const jobListDiv = document.getElementById("Joblist"); // element on HTML
    for (const jobId in jobs) {
                const job = jobs[jobId];

                // Create a container div for each job
                const jobContainer = document.createElement("div");
                jobContainer.classList.add("Job");

                // Create an img element for the job's logo
                const imgElement = document.createElement("img");
                imgElement.classList.add("circular-img")
                imgElement.src = job.logo;
                jobContainer.appendChild(imgElement);

                // Create a div for the job content
                const jobContenet = document.createElement("div");

                // Create a job comapny button for the job content
                const jobCompany = document.createElement("button");
                jobCompany.textContent = job.companyName;
                jobCompany.classList.add("Job-company");
                jobContenet.appendChild(jobCompany);

                // check new and featured and add them to the job content
               if(job.new){
                    const Newb = document.createElement("button");
                    Newb.textContent = "NEW";
                    Newb.classList.add("new");
                    jobContenet.appendChild(Newb);
                }
                if(job.featured){
                    const feature = document.createElement("button");
                    feature.textContent = "FEATURED";
                    feature.classList.add("feature");
                    jobContenet.appendChild(feature);
                }

                // Create a job title button for the job content
                const jobtitle = document.createElement("button");
                jobtitle.textContent = job.jobTitle;
                jobtitle.classList.add("Job-title");
                jobContenet.appendChild(jobtitle);

                const list = document.createElement("ul");

                // Create a job info buttons for the job content
                const postedat = document.createElement("li");
                postedat.textContent =  `${job.postedAt} .`
                postedat.classList.add("Job-type");
                list.appendChild(postedat);

                const jobtype = document.createElement("li");
                jobtype.textContent = `${job.contract} .`;
                jobtype.classList.add("Job-type");
                list.appendChild(jobtype);

                const joblocation = document.createElement("li");
                joblocation.textContent = `${job.location}`;
                joblocation.classList.add("Job-type");
                list.appendChild(joblocation);
                
                jobContenet.append(list);

                // Append the jobContent to the jobContainer
                jobContainer.appendChild(jobContenet);

                // Create a div for the tools,tech,role, and level
                const jobFeatures = document.createElement("div");
                jobFeatures.classList.add("features");

                // buttons for role,level,tech,and languages
                const role = document.createElement("button");
                role.textContent = job.role;
                role.classList.add("Job-feature");
                jobFeatures.appendChild(role);

                const level = document.createElement("button");
                level.textContent = job.level;
                level.classList.add("Job-feature");
                jobFeatures.appendChild(level);

                if(job.languages){
                    job.languages.forEach(function (language){ //since it's an array
                        const lan = document.createElement("button");
                        lan.textContent = language;
                        lan.classList.add("Job-feature");
                        jobFeatures.appendChild(lan);
                    })
                }

                if(job.tools){
                    job.tools.forEach(function (tool){ //since it's an array
                        const toolb = document.createElement("button");
                        toolb.textContent = tool;
                        toolb.classList.add("Job-feature");
                        jobFeatures.appendChild(toolb);
                    })
                }

                // Append the jobFeatures to jobContainer
                jobContainer.appendChild(jobFeatures)

                // Append the jobContainer to the jobListDiv
                jobListDiv.appendChild(jobContainer);
             }
         
}
function clearF(){ // Function for the clear button
    document.getElementById('search-bar').value = ''
}

//Seacrh
const searchCont = document.getElementById("search-bar");
searchCont.addEventListener("keydown",function(event){
    if(event.keyCode==13){
        const inputValue = searchCont.value;
        console.log("Input: ", inputValue);
        filterData(inputValue);

    }
});

function filterData(inputValue){
   const filteredData = allData.filter(function(job){
    return job.jobTitle.toLowerCase().includes(inputValue.toLowerCase())||job.companyName.toLowerCase().includes(inputValue.toLowerCase())|| job.contract.toLowerCase().includes(inputValue.toLowerCase()) || job.postedAt.toLowerCase().includes(inputValue.toLowerCase()) || job.location.toLowerCase().includes(inputValue.toLowerCase()) || job.role.toLowerCase().includes(inputValue.toLowerCase()) || job.level.toLowerCase().includes(inputValue.toLowerCase()) || job.tools && job.tools.some(function(tool){ return tool.toLowerCase().includes(inputValue.toLowerCase())})|| job.languages && job.languages.some(function(language){ return language.toLowerCase().includes(inputValue.toLowerCase())});
   });
   const jobListDiv = document.getElementById("Joblist"); // element on HTML
   jobListDiv.innerHTML="";
   appendData(filteredData);
}

