import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CategoryCard = ({ title, TitleIcon, Icon, data }) => {
  return (
    <>
      <Card className="py-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>{TitleIcon && <TitleIcon />}</span>
            <p>{title}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-center gap-1">
            {Icon && <Icon />}
            <span>{data}</span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryCard;
