<?php

namespace App\Enums;

enum AccountRecordType: string
{
    case TITHE = 'tithe';

    case FIRST_OFFERING = '1st offertory';

    case SECOND_OFFERING = '2nd offertory';

    case DONATION = 'donation';

    case THANKSGIVING = 'thanksgiving';

    case APPEAL = 'appeal';

    case PLEDGE = 'pledge';

    case SEED = 'seed';

    case CHILDREN_SERVICE = 'children service';
}
