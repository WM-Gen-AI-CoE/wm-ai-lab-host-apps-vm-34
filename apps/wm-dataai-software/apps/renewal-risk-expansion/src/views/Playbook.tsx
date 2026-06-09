import React, { useState } from 'react';
import { playbookItems } from '../data';
import { GuideCollapsible } from '../components/GuideCollapsible';
import { AITask, HumanTask, Badge, Button } from '../components/Shared';
import { ArrowRight, Pencil, Check, ShieldAlert, Users, Gift, GraduationCap, TrendingUp } from 'lucide-react';

const typeIcon: Record<string, any> = {
  'Save offer': Gift,
  'Exec sponsor': Users,
  'Training': GraduationCap,
  'Expansion proposal': TrendingUp,
};

export const Playbook = ({ onNext }: { onNext: () => void }) => {
  const [drafts, setDrafts] = useState<Record<string, string>>(
    Object.fromEntries(playbookItems.map(i => [i.id, i.draft]))
  );
  const [editing, setEditing] = useState<string | null>(null);
  const [edited, setEdited] = useState<string[]>([]);

  const markEdited = (id: string) => {
    if (!edited.includes(id)) setEdited(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <GuideCollapsible
        title="How to use this page"
        talkTrack="The agent gives the CSM a running start, not a finished answer. Every line is editable, and the CSM's judgment, the relationship context the data never sees, is what makes the plan real. Anything with a concession is flagged for manager approval up front."
      >
        <p>This page is the editable customer action plan.</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Review:</strong> Read the drafted plays: exec sponsor, save offer, training, and expansion.</li>
          <li><strong>Action:</strong> Click Edit on any line to rewrite it in your own words before it moves forward.</li>
          <li><strong>Decision:</strong> Items marked "needs approval" carry a concession or escalation and route to a manager next. You own every word.</li>
        </ul>
      </GuideCollapsible>

      <AITask>
        The agent drafted a 4-part action plan from the selected drivers and plays. The CSM edits each line. Two items carry a concession or escalation and are flagged to require manager approval before anything reaches the customer.
      </AITask>

      <div className="space-y-4">
        {playbookItems.map((item) => {
          const Icon = typeIcon[item.type];
          const isEditing = editing === item.id;
          const wasEdited = edited.includes(item.id);
          return (
            <div key={item.id} className="bg-white rounded-lg border border-wm-gray-med shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-wm-gray-med bg-wm-gray-light flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-semibold text-wm-blue">
                  <Icon className="w-4 h-4 text-wm-blue-highlight" /> {item.type}
                  <span className="text-xs text-wm-gray-dark font-normal">· {item.owner}</span>
                </span>
                <div className="flex items-center gap-2">
                  {wasEdited && <Badge variant="blue">Edited by CSM</Badge>}
                  {item.needsApproval && (
                    <Badge variant="amber"><ShieldAlert className="w-3 h-3 mr-1 inline" />Needs approval</Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <textarea
                      value={drafts[item.id]}
                      onChange={(e) => setDrafts(prev => ({ ...prev, [item.id]: e.target.value }))}
                      rows={4}
                      className="w-full text-sm border border-wm-gray-med rounded-md p-3 focus:outline-none focus:border-wm-blue-highlight focus:ring-1 focus:ring-wm-blue-highlight"
                    />
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => setEditing(null)} variant="outline">Cancel</Button>
                      <Button onClick={() => { markEdited(item.id); setEditing(null); }} variant="primary" Icon={Check}>Save edit</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-wm-gray-dark leading-relaxed">{drafts[item.id]}</p>
                    <Button onClick={() => setEditing(item.id)} variant="outline" Icon={Pencil} className="shrink-0">Edit</Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <HumanTask done={edited.length > 0}>
        {edited.length > 0
          ? `${edited.length} line(s) edited. Route the concession and escalation items to a manager for approval.`
          : 'Edit at least one line, then route the approval-flagged items to a manager. The model never sends anything to the customer on its own.'}
      </HumanTask>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" Icon={ArrowRight}>Route for approval</Button>
      </div>
    </div>
  );
};
