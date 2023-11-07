## Initial setup

Install both 
Node v18(https://nodejs.org/en) and 
Git(https://git-scm.com/download/mac) 
on your machine if you haven't yet, the Node installation comes with NPM
which will be used for package installation. Git will be required for git repo management


## Getting APP Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File Uploader
To upload a file, click the button on the homepage and you should be navigated to the file uplaod page, from there you can upload any of the ALS sample lab results to see the correct output. We were using the 'Dryden Government Dock - June 21, 2023.xlsx' File for our purposes.

## Notes
This project in its current form is incomplete and as such contains a few artifacts that were intended to be used had the project met its larger goals
- There is an underlying database with a seeder for test data, for ease of demo we opted to hardcode this, but the intention was to create a mechanism that allowed for users to edit guideline rules and have them persist for the file upload portion.
- The file uploader currently only loads on the page and displays the guideline breaks as above. The intention was to store the ALS sample results in the DB and have an interactive map that was filterable by different chemical analyates in the future.
- In addition, the file upload was intended to only happen once, and then the resutls could be referenced using the ALS sample ID on the webpage, the resulting page was intially intended to be downloadable as a PDF.
