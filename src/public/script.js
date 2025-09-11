
let username
let bio
let name

const getMonth = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[month]
}

const container = document.getElementById("container")
let x
const fetch = () => {
    const xhttp = new XMLHttpRequest()
    xhttp.onload = function () {
        x = JSON.parse(this.response)
        let a = document.cookie
        console.log(x)
        for (i = 0; i < x.length; i++) {
            console.log(x)
            username = x[i].username
            const date = new Date(x[i].dateCreated)
            name = x[i].name
             bio = x[i].bio
            if (!bio) {
                bio = ""
            }
            if (!name) {
                name = username
            }
            container.innerHTML += `
<div class="border-1 border-blue-500 h-40">
        <div id="name" class="text-lg pl-4">
            <h1 id="nameh2" class="text-center">${name}</h1>
        </div>
        <div id="username" class="text-sm pl-4">
            <p id="usernamep" class="text-center">@${username}</p>
        </div>
        <div class="pl-4">
            <p class="text-center">${bio}</p>
        </div>
         <div class="pl-4">
            <p class="text-center">📅 joined ${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}</p>
        </div>
</div>
`
        }
    }
    xhttp.open("GET", "/api/v1/user/all", true)
    xhttp.send()
}
fetch()
console.log(x)

