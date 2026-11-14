import type { Project } from '@/lib/data';

const buttonClass = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/20 px-5 py-2.5 text-sm font-medium';

export default function ProjectLinks({ project }: { project: Project }) {
  const sourceReady = Boolean(project.githubUrl) && !project.sourceUnavailable;
  const demoUrl = project.designUrl || (!project.liveUnavailable ? project.liveUrl : '');
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {sourceReady ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={buttonClass + ' text-black transition-colors hover:bg-black hover:text-white'}>Source Code ↗</a>
        ) : (
          <button type="button" disabled className={buttonClass + ' cursor-not-allowed bg-neutral-100 text-black/50'}>Source Code · Unavailable</button>
        )}
        {demoUrl ? (
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className={buttonClass + ' bg-black text-white transition-colors hover:bg-black/80'}>
            {project.designUrl ? 'View Figma Demo' : 'Live Demo'} ↗
          </a>
        ) : (
          <button type="button" disabled className={buttonClass + ' cursor-not-allowed bg-neutral-100 text-black/50'}>
            {project.liveUnavailable ? 'Live Demo · Offline' : 'Live Demo · TODO'}
          </button>
        )}
      </div>
      {!sourceReady && <p className="text-sm leading-relaxed text-black/60">{project.sourceUnavailable ? 'The source repository is currently unavailable.' : 'No public source repository is available for this project.'}</p>}
      {!demoUrl && <p className="text-sm leading-relaxed text-black/60">{project.liveUnavailable ? 'The live site is currently offline.' : 'No live site or recorded demo is available for this project.'}</p>}
    </div>
  );
}
