// mobx
import { observer } from "mobx-react-lite";
// lucide icons
import { Layers, Link, Paperclip } from "lucide-react";
// components
import { IssuePropertyState } from "../properties/state";
import { IssuePropertyPriority } from "../properties/priority";
import { IssuePropertyLabels } from "../properties/labels";
import { IssuePropertyAssignee } from "../properties/assignee";
import { IssuePropertyEstimates } from "../properties/estimates";
import { IssuePropertyDate } from "../properties/date";
import { Tooltip } from "@plane/ui";
import { IEstimatePoint, IIssue, IIssueLabels, IState, IUserLite, TIssuePriorities } from "types";

export interface IKanBanProperties {
  sub_group_id: string;
  columnId: string;
  issue: IIssue;
  handleIssues: (sub_group_by: string | null, group_by: string | null, issue: IIssue) => void;
  display_properties: any;
  states: IState[] | null;
  labels: IIssueLabels[] | null;
  members: IUserLite[] | null;
  estimates: IEstimatePoint[] | null;
}

export const KanBanProperties: React.FC<IKanBanProperties> = observer((props) => {
  const {
    sub_group_id,
    columnId: group_id,
    issue,
    handleIssues,
    display_properties,
    states,
    labels,
    members,
    estimates,
  } = props;

  const handleState = (state: IState) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, state: state.id }
    );
  };

  const handlePriority = (value: TIssuePriorities) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, priority: value }
    );
  };

  const handleLabel = (ids: string[]) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, labels_list: ids }
    );
  };

  const handleAssignee = (ids: string[]) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, assignees_list: ids }
    );
  };

  const handleStartDate = (date: string) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, start_date: date }
    );
  };

  const handleTargetDate = (date: string) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, target_date: date }
    );
  };

  const handleEstimate = (value: number | null) => {
    handleIssues(
      !sub_group_id && sub_group_id === "null" ? null : sub_group_id,
      !group_id && group_id === "null" ? null : group_id,
      { ...issue, estimate_point: value }
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap whitespace-nowrap">
      {/* basic properties */}
      {/* state */}
      {display_properties && display_properties?.state && (
        <IssuePropertyState
          value={issue?.state_detail || null}
          onChange={handleState}
          states={states}
          disabled={false}
          hideDropdownArrow={true}
        />
      )}

      {/* priority */}
      {display_properties && display_properties?.priority && (
        <IssuePropertyPriority
          value={issue?.priority || null}
          onChange={handlePriority}
          disabled={false}
          hideDropdownArrow={true}
        />
      )}

      {/* label */}
      {display_properties && display_properties?.labels && (
        <IssuePropertyLabels
          value={issue?.labels || null}
          onChange={handleLabel}
          labels={labels}
          disabled={false}
          hideDropdownArrow={true}
        />
      )}

      {/* assignee */}
      {display_properties && display_properties?.assignee && (
        <IssuePropertyAssignee
          value={issue?.assignees || null}
          hideDropdownArrow={true}
          onChange={handleAssignee}
          members={members}
          disabled={false}
        />
      )}

      {/* start date */}
      {display_properties && display_properties?.start_date && (
        <IssuePropertyDate
          value={issue?.start_date || null}
          onChange={(date: string) => handleStartDate(date)}
          disabled={false}
          placeHolder="Start date"
        />
      )}

      {/* target/due date */}
      {display_properties && display_properties?.due_date && (
        <IssuePropertyDate
          value={issue?.target_date || null}
          onChange={(date: string) => handleTargetDate(date)}
          disabled={false}
          placeHolder="Target date"
        />
      )}

      {/* estimates */}
      {display_properties && display_properties?.estimate && (
        <IssuePropertyEstimates
          value={issue?.estimate_point || null}
          onChange={handleEstimate}
          estimatePoints={estimates}
          disabled={false}
          hideDropdownArrow={true}
        />
      )}

      {/* extra render properties */}
      {/* sub-issues */}
      {display_properties && display_properties?.sub_issue_count && (
        <Tooltip tooltipHeading="Sub-issues" tooltipContent={`${issue.sub_issues_count}`}>
          <div className="flex-shrink-0 border-[0.5px] border-custom-border-300 overflow-hidden rounded flex justify-center items-center gap-2 px-2.5 py-1 h-5">
            <Layers className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
            <div className="text-xs">{issue.sub_issues_count}</div>
          </div>
        </Tooltip>
      )}

      {/* attachments */}
      {display_properties && display_properties?.attachment_count && (
        <Tooltip tooltipHeading="Attachments" tooltipContent={`${issue.attachment_count}`}>
          <div className="flex-shrink-0 border-[0.5px] border-custom-border-300 overflow-hidden rounded flex justify-center items-center gap-2 px-2.5 py-1 h-5">
            <Paperclip className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
            <div className="text-xs">{issue.attachment_count}</div>
          </div>
        </Tooltip>
      )}

      {/* link */}
      {display_properties && display_properties?.link && (
        <Tooltip tooltipHeading="Links" tooltipContent={`${issue.link_count}`}>
          <div className="flex-shrink-0 border-[0.5px] border-custom-border-300 overflow-hidden rounded flex justify-center items-center gap-2 px-2.5 py-1 h-5">
            <Link className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
            <div className="text-xs">{issue.link_count}</div>
          </div>
        </Tooltip>
      )}
    </div>
  );
});