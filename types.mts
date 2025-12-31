type TEventType =
  | "CommitCommentEvent"
  | "CreateEvent"
  | "DeleteEvent"
  | "DiscussionEvent"
  | "ForkEvent"
  | "GollumEvent"
  | "IssueCommentEvent"
  | "IssuesEvent"
  | "MemberEvent"
  | "PublicEvent"
  | "PullRequestEvent"
  | "PullRequestReviewEvent"
  | "PullRequestReviewCommentEvent"
  | "PushEvent"
  | "ReleaseEvent"
  | "WatchEvent";

interface IEventActor {
  id: number;
  login: string;
}

interface IEventRepo {
  id: number;
  name: string;
  url: string;
  payload: object;
  created_at: string;
}

interface IEvent {
  type: TEventType;
  actor: IEventActor;
  repo: IEventRepo;
}

interface ICommitCommentEvent extends IEvent {
  type: "CommitCommentEvent";
  payload: { action: "created" | string };
}

interface ICreateEvent extends IEvent {
  type: "CreateEvent";
  payload: { ref_type: "branch" | "tag" | "repository"; full_ref: string };
}

interface IDeleteEvent extends IEvent {
  type: "DeleteEvent";
  payload: { ref_type: "branch" | "tag" };
}

interface IDiscussionEvent extends IEvent {
  type: "DiscussionEvent";
  payload: { action: "created" | string };
}

interface IForkEvent extends IEvent {
  type: "ForkEvent";
  payload: { action: "forked" | string };
}

interface IGollumEvent extends IEvent {
  type: "GollumEvent";
}

interface IIssueCommentEvent extends IEvent {
  type: "IssueCommentEvent";
  payload: {
    action: "created" | string;
    issue: { url: string; title: string };
  };
}

interface IIssuesEvent extends IEvent {
  type: "IssuesEvent";
  payload: { action: "opened" | "closed" | "reopened" };
}

interface IMemberEvent extends IEvent {
  type: "MemberEvent";
  payload: { action: "added" | string };
}

interface IPublicEvent extends IEvent {
  type: "PublicEvent";
  payload: {};
}

interface IPullRequestEvent extends IEvent {
  type: "PullRequestEvent";
  payload: {
    action:
      | "opened"
      | "closed"
      | "merged"
      | "reopened"
      | "assigned"
      | "unassigned"
      | "labeled"
      | "unlabeled";
  };
}

interface IPullRequestReviewEvent extends IEvent {
  type: "PullRequestReviewEvent";
  payload: { action: "created" | "updated" | "dismissed" };
}

interface IPullRequestReviewCommentEvent extends IEvent {
  type: "PullRequestReviewCommentEvent";
  payload: {
    action: "created" | string;
    pull_request: { title: string };
  };
}

interface IPushEvent extends IEvent {
  type: "PushEvent";
  payload: { ref: string };
}

interface IReleaseEvent extends IEvent {
  type: "ReleaseEvent";
  payload: { action: "published" | string };
}

interface IWatchEvent extends IEvent {
  type: "WatchEvent";
  payload: { action: "started" | string };
}

export type TEvent =
  | ICommitCommentEvent
  | ICreateEvent
  | IDeleteEvent
  | IDiscussionEvent
  | IForkEvent
  | IGollumEvent
  | IIssueCommentEvent
  | IIssuesEvent
  | IMemberEvent
  | IPublicEvent
  | IPullRequestEvent
  | IPullRequestReviewEvent
  | IPullRequestReviewCommentEvent
  | IPushEvent
  | IReleaseEvent
  | IWatchEvent;
