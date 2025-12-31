import type { TEvent, INotFoundError } from "./types.mts";

const args = getProcessArgs(process.argv);
const username = args.at(0);

if (!username) {
  console.error("Usage: node index.ts <username>");
  process.exit(1);
}

fetch(`https://api.github.com/users/${username}/events`)
  .then((response) => response.json())
  .then((json: TEvent[] | INotFoundError) => {
    if (!Array.isArray(json)) {
      console.log(`${username} is not a Github user`);
      return;
    }

    const events = json;

    if (events.length === 0) {
      console.log(`${username} does not have any recent activity`);
      return;
    }

    for (let i = 0; i < events.length; i += 1) {
      const event = events[i];
      switch (event.type) {
        case "CommitCommentEvent": {
          console.log(
            `${event.payload.action} a commit comment on ${event.repo.name}`,
          );
          break;
        }
        case "CreateEvent": {
          let msg = `created a ${event.payload.ref_type}`;
          if (event.payload.ref_type === "repository") {
            msg += ` called ${event.repo.name}`;
          } else {
            const refName = event.payload.full_ref.split("/").at(-1);
            msg += ` in ${event.repo.name} called ${refName}`;
          }
          console.log(msg);
          break;
        }
        case "DeleteEvent": {
          console.log(
            `deleted a ${event.payload.ref_type} in ${event.repo.name}`,
          );
          break;
        }
        case "DiscussionEvent": {
          const action =
            event.payload.action === "created"
              ? "started"
              : event.payload.action;
          console.log(`${action} a discussion in ${event.repo.name}`);
          break;
        }
        case "ForkEvent": {
          console.log(`${event.payload.action} ${event.repo.name}`);
          break;
        }
        case "GollumEvent": {
          break;
        }
        case "IssueCommentEvent": {
          console.log(`left a comment in ${event.payload.issue.url}`);
          break;
        }
        case "MemberEvent": {
          if (event.payload.action === "added") {
            console.log(`accepted an invitation to ${event.repo.name}`);
          }
          break;
        }
        case "PublicEvent": {
          console.log(`make ${event.repo.name} public`);
          break;
        }
        case "PullRequestEvent": {
          console.log(
            `${event.payload.action} a pull request in ${event.repo.name}`,
          );
          break;
        }
        case "PullRequestReviewEvent": {
          console.log(
            `${event.payload.action} a PR review in ${event.repo.name}`,
          );
          break;
        }
        case "PullRequestReviewCommentEvent": {
          console.log(
            `${event.payload.action} a PR comment in ${event.repo.name} (${event.payload.pull_request.title})`,
          );
          break;
        }
        case "PushEvent": {
          console.log(`pushed to ${event.repo.name}`);
          break;
        }
        case "ReleaseEvent": {
          console.log(
            `${event.payload.action} a release for ${event.repo.name}`,
          );
        }
        case "WatchEvent": {
          console.log(`${event.payload.action} watching ${event.repo.name}`);
          break;
        }
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

function getProcessArgs(processArgs: string[]): string[] {
  // script was run with "node index.ts [args]"
  if (processArgs.at(0)?.endsWith("/node")) {
    return processArgs.slice(2);
  }

  // script was run as an executeable
  return processArgs.slice(1);
}
