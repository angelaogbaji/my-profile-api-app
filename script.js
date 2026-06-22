const profileDiv = document.getElementById("profile");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const refreshBtn = document.getElementById("refreshBtn");

async function fetchProfile() {
    loadingDiv.textContent = "Loading...";
    errorDiv.textContent = "";
    profileDiv.innerHTML = "";

    try {
        const response = await fetch(
            "https://api.github.com/users/octocat"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        profileDiv.innerHTML = `
            <img src="${data.avatar_url}" alt="Profile">
            <h2>${data.name}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>Followers: ${data.followers}</p>
            <p>Public Repos: ${data.public_repos}</p>
        `;
    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        loadingDiv.textContent = "";
    }
}

refreshBtn.addEventListener("click", fetchProfile);

fetchProfile();
