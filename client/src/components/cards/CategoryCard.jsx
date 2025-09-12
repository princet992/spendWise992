import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CategoryCard = ({ title, TitleIcon, Icon, data }) => {
  return (
    <>
      <Card className="bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-medium">
            {TitleIcon && <TitleIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />}
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <p className="flex items-center gap-2 text-gray-700 font-semibold text-xl md:text-2xl">
            {Icon && <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-500" />}
            {data}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryCard;
