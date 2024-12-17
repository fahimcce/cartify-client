/* eslint-disable react/self-closing-comp */
"use client";
import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
export default function CardSkeleton() {
  return (
    <Skeleton>
      <Card className="p-4 bg-dark rounded-xl text-white">
        <CardHeader className="pb-2 flex-col items-start">
          <div className="w-1/3 h-4 bg-gray-500 rounded mb-2"></div>
          <div className="w-full h-4 bg-gray-500 rounded mb-4"></div>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="w-2/3 h-6 bg-gray-500 rounded mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-500 rounded mb-4"></div>
          <div className="w-full h-40 bg-gray-500 rounded-xl"></div>
        </CardBody>
      </Card>
    </Skeleton>
  );
}
