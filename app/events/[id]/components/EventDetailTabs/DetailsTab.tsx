import { memo } from "react";

type DetailsTabProps = {
  event: any;
};

const DetailsTab = memo(({ event }: DetailsTabProps) => {
  return (
    <>
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: event.longDescription }} />
      </div>

      <div className="mt-8 pt-8 border-t border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Organizado por</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0D1621] rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-cyan-400">
              {event.organizer.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="text-white font-medium">{event.organizer}</h4>
            <p className="text-gray-400 text-sm">Organizador verificado</p>
          </div>
        </div>
      </div>
    </>
  );
});

DetailsTab.displayName = "DetailsTab";

export default DetailsTab;
