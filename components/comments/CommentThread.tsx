"use client";

import { useState } from "react";
import {
  CheckCircle2,
  EyeOff,
  Flag,
  Pencil,
  Reply,
  Trash2,
  X,
  Eye,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { sr } from "date-fns/locale";
import {
  CommentRow,
  CommentStatus,
  CommentThread as CommentThreadType,
  EDIT_WINDOW_MS,
  KIND_LABELS,
  MAX_BODY_LENGTH,
} from "@/lib/comments";
import CommentComposer from "./CommentComposer";
import ReportDialog from "./ReportDialog";

interface CommentThreadProps {
  thread: CommentThreadType;
  problemId: string;
  currentUserId: string | null;
  isAdmin: boolean;
  onChanged: () => void;
}

function KindBadge({ kind }: { kind: CommentRow["kind"] }) {
  const colors: Record<CommentRow["kind"], string> = {
    question: "bg-[#60a5fa]/15 text-[#60a5fa] border-[#60a5fa]/30",
    suggestion: "bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/30",
    bug_report: "bg-[#f87171]/15 text-[#f87171] border-[#f87171]/30",
  };
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[kind]}`}
    >
      {KIND_LABELS[kind]}
    </span>
  );
}

function StatusBadge({ status }: { status: CommentStatus }) {
  if (status === "open") return null;
  if (status === "resolved") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4ade80]">
        <CheckCircle2 size={10} /> Rešeno
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-bg/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
      <EyeOff size={10} /> Skriveno
    </span>
  );
}

function relativeTime(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: sr });
  } catch {
    return "";
  }
}

function CommentCard({
  comment,
  problemId,
  currentUserId,
  isAdmin,
  onChanged,
  onReply,
  showReplyButton,
}: {
  comment: CommentRow;
  problemId: string;
  currentUserId: string | null;
  isAdmin: boolean;
  onChanged: () => void;
  onReply?: () => void;
  showReplyButton: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);
  const [savingEdit, setSavingEdit] = useState(false);
  const [reporting, setReporting] = useState(false);

  const isAuthor = currentUserId === comment.userId;
  const createdAtMs = new Date(comment.createdAt).getTime();
  const canEdit = isAuthor && Date.now() - createdAtMs < EDIT_WINDOW_MS;
  const canDelete = isAuthor || isAdmin;
  const canReport = !isAuthor && !!currentUserId;
  const isHidden = comment.status === "hidden";

  const saveEdit = async () => {
    const trimmed = editBody.trim();
    if (!trimmed || savingEdit) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: trimmed }),
      });
      if (res.ok) {
        setEditing(false);
        onChanged();
      }
    } finally {
      setSavingEdit(false);
    }
  };

  const doDelete = async () => {
    if (!confirm("Obrisati komentar?")) return;
    const res = await fetch(`/api/comments/${comment.id}`, { method: "DELETE" });
    if (res.ok) onChanged();
  };

  const setStatus = async (status: CommentStatus) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) onChanged();
  };

  // Hidden comments show a placeholder to non-admins and the real body to admins.
  if (isHidden && !isAdmin) {
    return (
      <div className="rounded-xl border border-[var(--glass-border)] bg-bg/30 px-4 py-3">
        <p className="text-xs italic text-text-secondary">
          [Komentar je skriven od strane moderatora.]
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        isHidden
          ? "border-[#f87171]/30 bg-[#f87171]/5"
          : "border-[var(--glass-border)] bg-bg/30"
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-text">
          {comment.authorDisplayName}
        </span>
        <KindBadge kind={comment.kind} />
        <StatusBadge status={comment.status} />
        <span className="text-xs text-text-secondary">
          {relativeTime(comment.createdAt)}
        </span>
        {isAdmin && comment.reportCount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs text-[#f87171]">
            <Flag size={11} /> {comment.reportCount}
          </span>
        )}
      </div>

      {editing ? (
        <div className="mb-2">
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value.slice(0, MAX_BODY_LENGTH))}
            rows={3}
            className="w-full resize-none rounded-lg border border-[var(--glass-border)] bg-bg/50 px-3 py-2 text-sm text-text focus:border-[#ec5b13]/60 focus:outline-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => {
                setEditing(false);
                setEditBody(comment.body);
              }}
              className="rounded-lg px-3 py-1 text-xs text-text-secondary hover:text-text"
            >
              Otkaži
            </button>
            <button
              onClick={saveEdit}
              disabled={savingEdit || !editBody.trim()}
              className="rounded-lg bg-[#ec5b13] px-3 py-1 text-xs font-bold text-white disabled:opacity-50"
            >
              Sačuvaj
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-2 whitespace-pre-wrap text-sm leading-relaxed text-text">
          {comment.body}
        </p>
      )}

      {!editing && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
          {showReplyButton && onReply && (
            <button
              onClick={onReply}
              className="flex items-center gap-1 transition hover:text-[#ec5b13]"
            >
              <Reply size={12} /> Odgovori
            </button>
          )}
          {canEdit && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 transition hover:text-[#ec5b13]"
            >
              <Pencil size={12} /> Izmeni
            </button>
          )}
          {canDelete && (
            <button
              onClick={doDelete}
              className="flex items-center gap-1 transition hover:text-[#f87171]"
            >
              <Trash2 size={12} /> Obriši
            </button>
          )}
          {canReport && (
            <button
              onClick={() => setReporting(true)}
              className="flex items-center gap-1 transition hover:text-[#f87171]"
            >
              <Flag size={12} /> Prijavi
            </button>
          )}
          {isAdmin && comment.status !== "resolved" && (
            <button
              onClick={() => setStatus("resolved")}
              className="flex items-center gap-1 transition hover:text-[#4ade80]"
            >
              <CheckCircle2 size={12} /> Označi kao rešeno
            </button>
          )}
          {isAdmin && comment.status !== "hidden" && (
            <button
              onClick={() => setStatus("hidden")}
              className="flex items-center gap-1 transition hover:text-[#f87171]"
            >
              <EyeOff size={12} /> Sakrij
            </button>
          )}
          {isAdmin && comment.status === "hidden" && (
            <button
              onClick={() => setStatus("open")}
              className="flex items-center gap-1 transition hover:text-[#4ade80]"
            >
              <Eye size={12} /> Otkrij
            </button>
          )}
        </div>
      )}

      {reporting && (
        <ReportDialog
          commentId={comment.id}
          onClose={() => setReporting(false)}
          onReported={() => {
            setReporting(false);
            onChanged();
          }}
        />
      )}
    </div>
  );
}

export default function CommentThread({
  thread,
  problemId,
  currentUserId,
  isAdmin,
  onChanged,
}: CommentThreadProps) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="space-y-2">
      <CommentCard
        comment={thread.comment}
        problemId={problemId}
        currentUserId={currentUserId}
        isAdmin={isAdmin}
        onChanged={onChanged}
        onReply={() => setReplying(true)}
        showReplyButton={!replying && thread.comment.status !== "hidden"}
      />
      {thread.replies.length > 0 && (
        <div className="ml-5 space-y-2 border-l-2 border-[var(--glass-border)] pl-3">
          {thread.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              problemId={problemId}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              onChanged={onChanged}
              showReplyButton={false}
            />
          ))}
        </div>
      )}
      {replying && (
        <div className="ml-5 rounded-xl border border-[var(--glass-border)] bg-bg/20 p-3">
          <CommentComposer
            problemId={problemId}
            cardType={thread.comment.cardType}
            stepNumber={thread.comment.stepNumber}
            parentCommentId={thread.comment.id}
            placeholder="Napiši odgovor..."
            autoFocus
            onPosted={() => {
              setReplying(false);
              onChanged();
            }}
            onCancel={() => setReplying(false)}
          />
        </div>
      )}
    </div>
  );
}
