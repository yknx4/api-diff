## Api-Diff
> Roughly based on Twitter's [diffy](https://github.com/twitter/diffy), written from scratch. 
> Specially the README.md

This project is a transparent proxy that relays every call to three different servers and gets the difference between them.

## Status

This project is used in production at [Progressly](https://www.progressly.com) and is being actively developed and maintained.

## What is Api-Diff?

Api-Diff finds potential bugs in your service using running instances of your new code and your old
code side by side. Api-Diff behaves as a transparent proxy and multicasts whatever requests it receives to each of
the running instances. It then compares the responses, and reports any regressions that may surface
from those comparisons. The premise for Api-Diff is that if two implementations of the service return
“similar” responses for a sufficiently large and diverse set of requests, then the two
implementations can be treated as equivalent and the newer implementation is regression-free.

## How does Api-Diff work?

Api-Diff acts as a proxy that accepts requests drawn from any source that you provide and multicasts
each of those requests to three different service instances:

1. A candidate instance running your new code
2. A primary instance running your last known-good code
3. A secondary instance running the same known-good code as the primary instance

As Api-Diff receives a request, it is multicast and sent to your candidate, primary, and secondary
instances. When those services send responses back, Api-Diff compares those responses and looks for two
things:

1. Raw differences observed between the candidate and primary instances.
2. Non-deterministic noise observed between the primary and secondary instances. Since both of these
   instances are running known-good code, you should expect responses to be in agreement. If not,
   your service may have non-deterministic behavior, which is to be expected.

Api-Diff measures how often primary and secondary disagree with each other vs. how often primary and
candidate disagree with each other. If these measurements are roughly the same, then Api-Diff
determines that there is nothing wrong and that the error can be ignored.

## How to get started?

First create a `.env` file on the root directory based on the [example file](dotenv).
 - `ENVIRONMENT` = This is the environment you are working, usually production, stage or test.
 - `APP_NAME` = This is the name of the application
 - `PRIMARY_HOST` = This is the main host of the application, API-Diff will relay this host's response.
 - `SECONDARY_HOST` = This is a second host running the primary host's application to discard noise. (Timestamps, Request Ids, etc...)
 - `CANDIDATE_HOST` = This is the third host, the one you want to compare against.
 - `PROXY_PORT` = This is the port where API-Diff will be listening.
 - `ADMIN_PORT` = This is the dashboard port.
 - `SECRET` = Here you should set a secret in the form `login:password` for Basic Auth, we don't want strangers peeking.

Api-Diff comes bundled with `yarn dev` command that starts the Api-Diff locally. You can then go to your browser at 
[http://localhost:8081](http://localhost:8081/) to see the dashboard.

That was cool but now you want to compare old and new versions of your own service. Here’s how you can 
start using Api-Diff to compare three instances of your service:

1. Deploy your old code to `localhost:9990`. This is your primary.
2. Deploy your old code to `localhost:9991`. This is your secondary.
3. Deploy your new code to `localhost:9992`. This is your candidate.
4. `cp dotenv .env && vim .env`. Hint: Set the configuration based on the above hosts.
5. Run the API-Diff with `yarn dev`
6. Send a few test requests to your Api-Diff instance on its proxy port:

    ```
    curl localhost:8080/your/application/route?with=queryparams
    ```

7. Watch the differences show up in your browser at [http://localhost:8081](http://localhost:8081/).

### Running example on docker-compose

Coming soon...
 
## FAQ's
   For safety reasons `POST`, `PUT`, ` DELETE ` are ignored by default. And this will not be changed.
   
## License

Licensed under the **[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)** (the "License");
you may not use this software except in compliance with the License.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
