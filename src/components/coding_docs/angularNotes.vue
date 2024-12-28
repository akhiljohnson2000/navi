<template>
    <button class="btn btn-link" data-bs-target="#angular-18-route-redirection-with-functions"
        data-bs-toggle="collapse"> Route Redirects with Functions </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="angular-18-route-redirection-with-functions">
        <p>
            // After (using a function)
            const routes: Routes = [
            {
                path: 'page1',
                redirectTo: (url) => {
                return '/page2';
                },
                pathMatch: 'full'
            }
            ];
        </p>
    </div>
    <br>

    <button class="btn btn-link" data-bs-target="#default-content"
        data-bs-toggle="collapse"> Default Content </button>
    <div class="collapse py-2" style="padding-left: 50px;" id="default-content">
        Default content is now allowed within the ng-content tag. 
    </div>
    <br>




</template>