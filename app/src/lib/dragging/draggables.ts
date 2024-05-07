import { get, type Readable } from 'svelte/store';
import type { Line } from '$lib/utils/fileSections';
import type { AnyCommit, AnyFile, Branch, Commit, Hunk, RemoteCommit } from '../vbranches/types';

export function nonDraggable() {
	return {
		disabled: true,
		data: undefined
	};
}

export class DraggableSplitHunk {
	constructor(
		public readonly branchId: string,
		public readonly hunk: Hunk,
		public readonly lines: Set<Line>
	) {}
}

export class DraggableHunk {
	constructor(
		public readonly branchId: string,
		public readonly hunk: Hunk
	) {}
}

export class DraggableFile {
	constructor(
		public readonly branchId: string,
		public file: AnyFile,
		public commit: AnyCommit | undefined,
		private selection: AnyFile[] | undefined
	) {}

	get files(): AnyFile[] {
		if (this.selection && this.selection.length > 0) return this.selection;
		return [this.file];
	}
}

export class DraggableCommit {
	constructor(
		public readonly branchId: string,
		public readonly commit: Commit,
		public readonly isHeadCommit: boolean
	) {}
}

export class DraggableRemoteCommit {
	constructor(
		public readonly branchId: string,
		public readonly remoteCommit: RemoteCommit
	) {}
}

export type Draggable = DraggableFile | DraggableHunk | DraggableCommit | DraggableSplitHunk;
