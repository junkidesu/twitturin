import Card from "../containers/Card";
import Heading from "../core/text/Heading";

const PageHeading = ({ label, level }: { label: string, level?: 1 | 2 | 3 | 4 }) => {
  return (
    <Card>
      <Heading $level={level || 2}>{label}</Heading>
    </Card>
  );
};

export default PageHeading;
