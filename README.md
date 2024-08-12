## 🛠️ Setup Instructions to Run Locally

1. **Clone the Frontend Repository**:  

2. **Update URLs**:  
- Replace the URLs in `http-token-interceptor` with your localhost URL.
- Update the URL in `GistService` (`backendOAuthUrl`) with your local backend URL.
- Inside the `getGithubToken` method, replace the `redirectUri` with your frontend local URL.
- In `ProductDetailsComponent`, update the `redirectUri` in the `exportAsGist()` method with your frontend local URL.

3. **Set Up GitHub OAuth**:  
- Go to GitHub Developer Settings and create a new OAuth App.
- Generate a Client ID and Client Secret.
- Use these credentials in the backend `application.yaml` file.

4. **Install Dependencies & Run**:  
- Navigate to the project directory and run:
`npm install`
`ng serve`
- The  application will be up and running.
