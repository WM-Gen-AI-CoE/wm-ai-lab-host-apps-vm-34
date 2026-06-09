import React, { useState } from 'react';
import { coverNoteDraft, marginBridge } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Button, Badge } from '../components/Shared';
import { ArrowRight, Check, Pencil, FileText } from 'lucide-react';

const recommendationLines = [
  { label: 'Close discount to segment floor', value: '22% to 15%', note: 'Recovers $29,400 ARR' },
  { label: 'Apply standard renewal uplift', value: '3% + seat true-up', note: 'Adds $30,600 ARR' },
  { label: 'Decline most-favored-pricing clause', value: 'Substitute CPI-linked uplift, 7% ceiling', note: 'Removes margin risk' },
  { label: 'Approved competitive concession', value: 'Up to $8,400', note: 'Deal-desk discretion' },
];

export const Recommend = ({ onNext }: { onNext: () => void }) => {
  const [note, setNote] = useState(coverNoteDraft);
  const [editing, setEditing] = useState(false);
  const [approvedNote, setApprovedNote] = useState(false);

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The agent drafts the recommended terms and a customer-facing cover note, but the deal desk owns every word. Notice the cover note never mentions AI or automation. It speaks to the customer about value and partnership. You edit and approve before anything routes."
      >
        <p>This page is the drafted recommendation and customer cover note.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the recommended price, uplift, and approval path.</li>
          <li><strong>Edit:</strong> Adjust the customer-facing cover note and approve it.</li>
          <li><strong>Decision:</strong> You own the wording and the terms. The agent drafts; it never sends anything to the customer.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        Based on the accepted leakage flags, the agent drafted a recommendation against the approved margin model and pricing playbook, plus a customer-facing cover note for your review. The cover note is written in plain business language and makes no reference to AI or automation.
      </AITask>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="font-semibold text-wm-blue text-sm">Recommended Terms</h3>
          <Badge variant="blue">Recommended ARR $471,600</Badge>
        </div>
        <ul className="divide-y divide-wm-gray-med">
          {recommendationLines.map((r, i) => (
            <li key={i} className="px-4 py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-wm-blue">{r.label}</p>
                <p className="text-xs text-wm-gray-dark">{r.value}</p>
              </div>
              <span className="text-xs font-semibold text-green-700 whitespace-nowrap">{r.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold text-wm-blue text-sm"><FileText className="w-4 h-4" /> Customer Renewal Cover Note</h3>
          {!editing && (
            <Button onClick={() => { setEditing(true); setApprovedNote(false); }} variant="outline" Icon={Pencil}>Edit</Button>
          )}
        </div>
        <div className="p-4">
          {editing ? (
            <div className="space-y-3">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={6}
                className="w-full text-sm text-wm-gray-dark border border-wm-gray-med rounded-md p-3 focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight leading-relaxed"
              />
              <div className="flex justify-end gap-2">
                <Button onClick={() => { setNote(coverNoteDraft); }} variant="secondary">Reset to draft</Button>
                <Button onClick={() => { setEditing(false); setApprovedNote(true); }} variant="primary" Icon={Check}>Save &amp; approve note</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-wm-gray-dark leading-relaxed whitespace-pre-wrap">{note}</p>
          )}
        </div>
      </div>

      <HumanTask done={approvedNote}>
        {approvedNote
          ? 'Cover note approved by the deal desk. Recommendation is ready to route for approval.'
          : 'Edit and approve the customer cover note. The agent drafts the wording, but the deal desk approves it before the deal can route.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" disabled={!approvedNote} Icon={ArrowRight}>Route for approval</Button>
      </div>

      <p className="text-[11px] text-wm-gray-dark text-center">
        Margin bridge preview: {marginBridge.map((b) => b.label).slice(0, 4).join(', ')} and more, finalized on the Impact step.
      </p>
    </div>
  );
};
