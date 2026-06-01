import NetPathDetail from '@/components/features/netpath/netpath-detail';

export default function Page({ params }) {
  return <NetPathDetail pathId={params.pathId} />;
}
