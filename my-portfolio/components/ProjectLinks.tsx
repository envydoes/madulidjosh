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
          <button type="button" disabled className={buttonClass + ' cursor-not-allowed bg-neutral-100 text-black/50'}>Source Code · TODO</button>
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
      {!sourceReady && <p className="text-sm leading-relaxed text-black/60">{project.sourceUnavailable ? 'TODO: Update the Aurora GitHub URL or restore public access; the existing repository returns 404.' : 'TODO: Add a GitHub repository URL, or confirm that this is a design-only project with no source repository.'}</p>}
      {!demoUrl && <p className="text-sm leading-relaxed text-black/60">{project.liveUnavailable ? 'TODO: Restore the SumEste deployment or provide a working demo URL. The former deployment is currently offline.' : 'TODO: Add a live site or recorded demo URL for Aurora.'}</p>}
    </div>
  );
}
