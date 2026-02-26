import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DrawModel = runtime.Types.Result.DefaultSelection<Prisma.$DrawPayload>;
export type AggregateDraw = {
    _count: DrawCountAggregateOutputType | null;
    _avg: DrawAvgAggregateOutputType | null;
    _sum: DrawSumAggregateOutputType | null;
    _min: DrawMinAggregateOutputType | null;
    _max: DrawMaxAggregateOutputType | null;
};
export type DrawAvgAggregateOutputType = {
    onChainDrawId: number | null;
    winningNumbers: number | null;
};
export type DrawSumAggregateOutputType = {
    onChainDrawId: number | null;
    winningNumbers: number[];
};
export type DrawMinAggregateOutputType = {
    id: string | null;
    onChainDrawId: number | null;
    totalPrize: string | null;
    status: $Enums.DrawStatus | null;
    executedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DrawMaxAggregateOutputType = {
    id: string | null;
    onChainDrawId: number | null;
    totalPrize: string | null;
    status: $Enums.DrawStatus | null;
    executedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DrawCountAggregateOutputType = {
    id: number;
    onChainDrawId: number;
    winningNumbers: number;
    totalPrize: number;
    status: number;
    executedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DrawAvgAggregateInputType = {
    onChainDrawId?: true;
    winningNumbers?: true;
};
export type DrawSumAggregateInputType = {
    onChainDrawId?: true;
    winningNumbers?: true;
};
export type DrawMinAggregateInputType = {
    id?: true;
    onChainDrawId?: true;
    totalPrize?: true;
    status?: true;
    executedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DrawMaxAggregateInputType = {
    id?: true;
    onChainDrawId?: true;
    totalPrize?: true;
    status?: true;
    executedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DrawCountAggregateInputType = {
    id?: true;
    onChainDrawId?: true;
    winningNumbers?: true;
    totalPrize?: true;
    status?: true;
    executedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DrawAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DrawWhereInput;
    orderBy?: Prisma.DrawOrderByWithRelationInput | Prisma.DrawOrderByWithRelationInput[];
    cursor?: Prisma.DrawWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DrawCountAggregateInputType;
    _avg?: DrawAvgAggregateInputType;
    _sum?: DrawSumAggregateInputType;
    _min?: DrawMinAggregateInputType;
    _max?: DrawMaxAggregateInputType;
};
export type GetDrawAggregateType<T extends DrawAggregateArgs> = {
    [P in keyof T & keyof AggregateDraw]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDraw[P]> : Prisma.GetScalarType<T[P], AggregateDraw[P]>;
};
export type DrawGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DrawWhereInput;
    orderBy?: Prisma.DrawOrderByWithAggregationInput | Prisma.DrawOrderByWithAggregationInput[];
    by: Prisma.DrawScalarFieldEnum[] | Prisma.DrawScalarFieldEnum;
    having?: Prisma.DrawScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DrawCountAggregateInputType | true;
    _avg?: DrawAvgAggregateInputType;
    _sum?: DrawSumAggregateInputType;
    _min?: DrawMinAggregateInputType;
    _max?: DrawMaxAggregateInputType;
};
export type DrawGroupByOutputType = {
    id: string;
    onChainDrawId: number;
    winningNumbers: number[];
    totalPrize: string;
    status: $Enums.DrawStatus;
    executedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: DrawCountAggregateOutputType | null;
    _avg: DrawAvgAggregateOutputType | null;
    _sum: DrawSumAggregateOutputType | null;
    _min: DrawMinAggregateOutputType | null;
    _max: DrawMaxAggregateOutputType | null;
};
type GetDrawGroupByPayload<T extends DrawGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DrawGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DrawGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DrawGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DrawGroupByOutputType[P]>;
}>>;
export type DrawWhereInput = {
    AND?: Prisma.DrawWhereInput | Prisma.DrawWhereInput[];
    OR?: Prisma.DrawWhereInput[];
    NOT?: Prisma.DrawWhereInput | Prisma.DrawWhereInput[];
    id?: Prisma.UuidFilter<"Draw"> | string;
    onChainDrawId?: Prisma.IntFilter<"Draw"> | number;
    winningNumbers?: Prisma.IntNullableListFilter<"Draw">;
    totalPrize?: Prisma.StringFilter<"Draw"> | string;
    status?: Prisma.EnumDrawStatusFilter<"Draw"> | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFilter<"Draw"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Draw"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Draw"> | Date | string;
    tickets?: Prisma.TicketListRelationFilter;
};
export type DrawOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    onChainDrawId?: Prisma.SortOrder;
    winningNumbers?: Prisma.SortOrder;
    totalPrize?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tickets?: Prisma.TicketOrderByRelationAggregateInput;
};
export type DrawWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    onChainDrawId?: number;
    AND?: Prisma.DrawWhereInput | Prisma.DrawWhereInput[];
    OR?: Prisma.DrawWhereInput[];
    NOT?: Prisma.DrawWhereInput | Prisma.DrawWhereInput[];
    winningNumbers?: Prisma.IntNullableListFilter<"Draw">;
    totalPrize?: Prisma.StringFilter<"Draw"> | string;
    status?: Prisma.EnumDrawStatusFilter<"Draw"> | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFilter<"Draw"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Draw"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Draw"> | Date | string;
    tickets?: Prisma.TicketListRelationFilter;
}, "id" | "onChainDrawId">;
export type DrawOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    onChainDrawId?: Prisma.SortOrder;
    winningNumbers?: Prisma.SortOrder;
    totalPrize?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DrawCountOrderByAggregateInput;
    _avg?: Prisma.DrawAvgOrderByAggregateInput;
    _max?: Prisma.DrawMaxOrderByAggregateInput;
    _min?: Prisma.DrawMinOrderByAggregateInput;
    _sum?: Prisma.DrawSumOrderByAggregateInput;
};
export type DrawScalarWhereWithAggregatesInput = {
    AND?: Prisma.DrawScalarWhereWithAggregatesInput | Prisma.DrawScalarWhereWithAggregatesInput[];
    OR?: Prisma.DrawScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DrawScalarWhereWithAggregatesInput | Prisma.DrawScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Draw"> | string;
    onChainDrawId?: Prisma.IntWithAggregatesFilter<"Draw"> | number;
    winningNumbers?: Prisma.IntNullableListFilter<"Draw">;
    totalPrize?: Prisma.StringWithAggregatesFilter<"Draw"> | string;
    status?: Prisma.EnumDrawStatusWithAggregatesFilter<"Draw"> | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeWithAggregatesFilter<"Draw"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Draw"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Draw"> | Date | string;
};
export type DrawCreateInput = {
    id?: string;
    onChainDrawId: number;
    winningNumbers?: Prisma.DrawCreatewinningNumbersInput | number[];
    totalPrize: string;
    status: $Enums.DrawStatus;
    executedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tickets?: Prisma.TicketCreateNestedManyWithoutDrawInput;
};
export type DrawUncheckedCreateInput = {
    id?: string;
    onChainDrawId: number;
    winningNumbers?: Prisma.DrawCreatewinningNumbersInput | number[];
    totalPrize: string;
    status: $Enums.DrawStatus;
    executedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutDrawInput;
};
export type DrawUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainDrawId?: Prisma.IntFieldUpdateOperationsInput | number;
    winningNumbers?: Prisma.DrawUpdatewinningNumbersInput | number[];
    totalPrize?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tickets?: Prisma.TicketUpdateManyWithoutDrawNestedInput;
};
export type DrawUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainDrawId?: Prisma.IntFieldUpdateOperationsInput | number;
    winningNumbers?: Prisma.DrawUpdatewinningNumbersInput | number[];
    totalPrize?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutDrawNestedInput;
};
export type DrawCreateManyInput = {
    id?: string;
    onChainDrawId: number;
    winningNumbers?: Prisma.DrawCreatewinningNumbersInput | number[];
    totalPrize: string;
    status: $Enums.DrawStatus;
    executedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DrawUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainDrawId?: Prisma.IntFieldUpdateOperationsInput | number;
    winningNumbers?: Prisma.DrawUpdatewinningNumbersInput | number[];
    totalPrize?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DrawUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainDrawId?: Prisma.IntFieldUpdateOperationsInput | number;
    winningNumbers?: Prisma.DrawUpdatewinningNumbersInput | number[];
    totalPrize?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    has?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    hasSome?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type DrawCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onChainDrawId?: Prisma.SortOrder;
    winningNumbers?: Prisma.SortOrder;
    totalPrize?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DrawAvgOrderByAggregateInput = {
    onChainDrawId?: Prisma.SortOrder;
    winningNumbers?: Prisma.SortOrder;
};
export type DrawMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onChainDrawId?: Prisma.SortOrder;
    totalPrize?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DrawMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onChainDrawId?: Prisma.SortOrder;
    totalPrize?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    executedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DrawSumOrderByAggregateInput = {
    onChainDrawId?: Prisma.SortOrder;
    winningNumbers?: Prisma.SortOrder;
};
export type DrawScalarRelationFilter = {
    is?: Prisma.DrawWhereInput;
    isNot?: Prisma.DrawWhereInput;
};
export type DrawCreatewinningNumbersInput = {
    set: number[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DrawUpdatewinningNumbersInput = {
    set?: number[];
    push?: number | number[];
};
export type EnumDrawStatusFieldUpdateOperationsInput = {
    set?: $Enums.DrawStatus;
};
export type DrawCreateNestedOneWithoutTicketsInput = {
    create?: Prisma.XOR<Prisma.DrawCreateWithoutTicketsInput, Prisma.DrawUncheckedCreateWithoutTicketsInput>;
    connectOrCreate?: Prisma.DrawCreateOrConnectWithoutTicketsInput;
    connect?: Prisma.DrawWhereUniqueInput;
};
export type DrawUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: Prisma.XOR<Prisma.DrawCreateWithoutTicketsInput, Prisma.DrawUncheckedCreateWithoutTicketsInput>;
    connectOrCreate?: Prisma.DrawCreateOrConnectWithoutTicketsInput;
    upsert?: Prisma.DrawUpsertWithoutTicketsInput;
    connect?: Prisma.DrawWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DrawUpdateToOneWithWhereWithoutTicketsInput, Prisma.DrawUpdateWithoutTicketsInput>, Prisma.DrawUncheckedUpdateWithoutTicketsInput>;
};
export type DrawCreateWithoutTicketsInput = {
    id?: string;
    onChainDrawId: number;
    winningNumbers?: Prisma.DrawCreatewinningNumbersInput | number[];
    totalPrize: string;
    status: $Enums.DrawStatus;
    executedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DrawUncheckedCreateWithoutTicketsInput = {
    id?: string;
    onChainDrawId: number;
    winningNumbers?: Prisma.DrawCreatewinningNumbersInput | number[];
    totalPrize: string;
    status: $Enums.DrawStatus;
    executedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DrawCreateOrConnectWithoutTicketsInput = {
    where: Prisma.DrawWhereUniqueInput;
    create: Prisma.XOR<Prisma.DrawCreateWithoutTicketsInput, Prisma.DrawUncheckedCreateWithoutTicketsInput>;
};
export type DrawUpsertWithoutTicketsInput = {
    update: Prisma.XOR<Prisma.DrawUpdateWithoutTicketsInput, Prisma.DrawUncheckedUpdateWithoutTicketsInput>;
    create: Prisma.XOR<Prisma.DrawCreateWithoutTicketsInput, Prisma.DrawUncheckedCreateWithoutTicketsInput>;
    where?: Prisma.DrawWhereInput;
};
export type DrawUpdateToOneWithWhereWithoutTicketsInput = {
    where?: Prisma.DrawWhereInput;
    data: Prisma.XOR<Prisma.DrawUpdateWithoutTicketsInput, Prisma.DrawUncheckedUpdateWithoutTicketsInput>;
};
export type DrawUpdateWithoutTicketsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainDrawId?: Prisma.IntFieldUpdateOperationsInput | number;
    winningNumbers?: Prisma.DrawUpdatewinningNumbersInput | number[];
    totalPrize?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DrawUncheckedUpdateWithoutTicketsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onChainDrawId?: Prisma.IntFieldUpdateOperationsInput | number;
    winningNumbers?: Prisma.DrawUpdatewinningNumbersInput | number[];
    totalPrize?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumDrawStatusFieldUpdateOperationsInput | $Enums.DrawStatus;
    executedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DrawCountOutputType = {
    tickets: number;
};
export type DrawCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tickets?: boolean | DrawCountOutputTypeCountTicketsArgs;
};
export type DrawCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawCountOutputTypeSelect<ExtArgs> | null;
};
export type DrawCountOutputTypeCountTicketsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TicketWhereInput;
};
export type DrawSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onChainDrawId?: boolean;
    winningNumbers?: boolean;
    totalPrize?: boolean;
    status?: boolean;
    executedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tickets?: boolean | Prisma.Draw$ticketsArgs<ExtArgs>;
    _count?: boolean | Prisma.DrawCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["draw"]>;
export type DrawSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onChainDrawId?: boolean;
    winningNumbers?: boolean;
    totalPrize?: boolean;
    status?: boolean;
    executedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["draw"]>;
export type DrawSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onChainDrawId?: boolean;
    winningNumbers?: boolean;
    totalPrize?: boolean;
    status?: boolean;
    executedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["draw"]>;
export type DrawSelectScalar = {
    id?: boolean;
    onChainDrawId?: boolean;
    winningNumbers?: boolean;
    totalPrize?: boolean;
    status?: boolean;
    executedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DrawOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "onChainDrawId" | "winningNumbers" | "totalPrize" | "status" | "executedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["draw"]>;
export type DrawInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tickets?: boolean | Prisma.Draw$ticketsArgs<ExtArgs>;
    _count?: boolean | Prisma.DrawCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DrawIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DrawIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DrawPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Draw";
    objects: {
        tickets: Prisma.$TicketPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        onChainDrawId: number;
        winningNumbers: number[];
        totalPrize: string;
        status: $Enums.DrawStatus;
        executedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["draw"]>;
    composites: {};
};
export type DrawGetPayload<S extends boolean | null | undefined | DrawDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DrawPayload, S>;
export type DrawCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DrawFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DrawCountAggregateInputType | true;
};
export interface DrawDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Draw'];
        meta: {
            name: 'Draw';
        };
    };
    findUnique<T extends DrawFindUniqueArgs>(args: Prisma.SelectSubset<T, DrawFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DrawFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DrawFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DrawFindFirstArgs>(args?: Prisma.SelectSubset<T, DrawFindFirstArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DrawFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DrawFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DrawFindManyArgs>(args?: Prisma.SelectSubset<T, DrawFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DrawCreateArgs>(args: Prisma.SelectSubset<T, DrawCreateArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DrawCreateManyArgs>(args?: Prisma.SelectSubset<T, DrawCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DrawCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DrawCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DrawDeleteArgs>(args: Prisma.SelectSubset<T, DrawDeleteArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DrawUpdateArgs>(args: Prisma.SelectSubset<T, DrawUpdateArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DrawDeleteManyArgs>(args?: Prisma.SelectSubset<T, DrawDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DrawUpdateManyArgs>(args: Prisma.SelectSubset<T, DrawUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DrawUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DrawUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DrawUpsertArgs>(args: Prisma.SelectSubset<T, DrawUpsertArgs<ExtArgs>>): Prisma.Prisma__DrawClient<runtime.Types.Result.GetResult<Prisma.$DrawPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DrawCountArgs>(args?: Prisma.Subset<T, DrawCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DrawCountAggregateOutputType> : number>;
    aggregate<T extends DrawAggregateArgs>(args: Prisma.Subset<T, DrawAggregateArgs>): Prisma.PrismaPromise<GetDrawAggregateType<T>>;
    groupBy<T extends DrawGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DrawGroupByArgs['orderBy'];
    } : {
        orderBy?: DrawGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DrawGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDrawGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DrawFieldRefs;
}
export interface Prisma__DrawClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tickets<T extends Prisma.Draw$ticketsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Draw$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DrawFieldRefs {
    readonly id: Prisma.FieldRef<"Draw", 'String'>;
    readonly onChainDrawId: Prisma.FieldRef<"Draw", 'Int'>;
    readonly winningNumbers: Prisma.FieldRef<"Draw", 'Int[]'>;
    readonly totalPrize: Prisma.FieldRef<"Draw", 'String'>;
    readonly status: Prisma.FieldRef<"Draw", 'DrawStatus'>;
    readonly executedAt: Prisma.FieldRef<"Draw", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Draw", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Draw", 'DateTime'>;
}
export type DrawFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where: Prisma.DrawWhereUniqueInput;
};
export type DrawFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where: Prisma.DrawWhereUniqueInput;
};
export type DrawFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where?: Prisma.DrawWhereInput;
    orderBy?: Prisma.DrawOrderByWithRelationInput | Prisma.DrawOrderByWithRelationInput[];
    cursor?: Prisma.DrawWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DrawScalarFieldEnum | Prisma.DrawScalarFieldEnum[];
};
export type DrawFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where?: Prisma.DrawWhereInput;
    orderBy?: Prisma.DrawOrderByWithRelationInput | Prisma.DrawOrderByWithRelationInput[];
    cursor?: Prisma.DrawWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DrawScalarFieldEnum | Prisma.DrawScalarFieldEnum[];
};
export type DrawFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where?: Prisma.DrawWhereInput;
    orderBy?: Prisma.DrawOrderByWithRelationInput | Prisma.DrawOrderByWithRelationInput[];
    cursor?: Prisma.DrawWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DrawScalarFieldEnum | Prisma.DrawScalarFieldEnum[];
};
export type DrawCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DrawCreateInput, Prisma.DrawUncheckedCreateInput>;
};
export type DrawCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DrawCreateManyInput | Prisma.DrawCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DrawCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    data: Prisma.DrawCreateManyInput | Prisma.DrawCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DrawUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DrawUpdateInput, Prisma.DrawUncheckedUpdateInput>;
    where: Prisma.DrawWhereUniqueInput;
};
export type DrawUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DrawUpdateManyMutationInput, Prisma.DrawUncheckedUpdateManyInput>;
    where?: Prisma.DrawWhereInput;
    limit?: number;
};
export type DrawUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DrawUpdateManyMutationInput, Prisma.DrawUncheckedUpdateManyInput>;
    where?: Prisma.DrawWhereInput;
    limit?: number;
};
export type DrawUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where: Prisma.DrawWhereUniqueInput;
    create: Prisma.XOR<Prisma.DrawCreateInput, Prisma.DrawUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DrawUpdateInput, Prisma.DrawUncheckedUpdateInput>;
};
export type DrawDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
    where: Prisma.DrawWhereUniqueInput;
};
export type DrawDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DrawWhereInput;
    limit?: number;
};
export type Draw$ticketsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput | Prisma.TicketOrderByWithRelationInput[];
    cursor?: Prisma.TicketWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TicketScalarFieldEnum | Prisma.TicketScalarFieldEnum[];
};
export type DrawDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DrawSelect<ExtArgs> | null;
    omit?: Prisma.DrawOmit<ExtArgs> | null;
    include?: Prisma.DrawInclude<ExtArgs> | null;
};
export {};
