const form = document.getElementById("form")
const container = document.getElementById("container")

form.onsubmit = e => {
    e.preventDefault()
    const username = form.username.value
    const password = form.password.value
    signin(username, password)
}

const getMonth = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[month]
}

const signin = async (username, password) => {
    console.log(username, password)

    const user = await fetch("/api/v1/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    const User = await user.json()
    //const User = await _user.user
    console.log(User.username)
    const date = new Date(User.dateCreated)

    if (!User.name)
        User.name = username

    if (!User.bio)
        User.bio = ""

    if (user.status == 200 || user.status == 201)
        container.innerHTML = `
<div class="border-1 border-blue-500 h-40">
        <div id="name" class="text-lg pl-4">
            <h1 id="nameh2" class="text-center">${User.name}</h1>
        </div>
        <div id="username" class="text-sm pl-4">
            <p id="usernamep" class="text-center">@${User.username}</p>
        </div>
        <div class="pl-4">
            <p class="text-center">${User.bio}</p>
        </div>
        <div class="pl-4">
            <p class="text-center">📅 joined ${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}</p>
        </div>
</div>
`
    localStorage.setItem("sessionId", _user.sessionId)
    localStorage.setItem("id", User.id)
   
}