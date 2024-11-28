import AddIcon from "./add.svg";
import ArrowDown from "./arrow-down.svg";
import ArrowRight from "./arrow-right.svg";
import ArrowIcon from "./arrow.svg";
import BitCoin from "./bitcoin.svg";
import BulbIcon from "./bulb.svg";
import CancelIcon from "./cancel.svg";
import IconCart from "./cart.svg";
import IconCheck from "./check.svg";
import RemoveBin from "./clear.svg";
import CloseIcon from "./close.svg";
import CoinIcon from "./coin.svg";
import CopyIcon from "./copy.svg";
import CryptoIcon from "./crypto.svg";
import IconDelete from "./delete.svg";
import DotsIcon from "./dots.svg";
import EditIcon from "./edit.svg";
import FirstIcon from "./first.svg";
import GalleryEdit from "./gallery-edit.svg";
import GameIcon from "./game.svg";
import Help from "./help4.svg";
import Home from "./home.svg";
import ImagePlusIcon from "./image-plus.svg";
import Image2Meme from "./image2meme.svg";
import ImageRoMeme from "./imagetomeme.svg";
import IndirectIcon from "./indirect.svg";
import InfoIcon from "./info.svg";
import Language from "./language03.svg";
import Bulb from "./light-bulb.svg";
import LikeIcon from "./like.svg";
import Loading from "./loading.svg";
import Logo from "./logo.svg";
import LogoProfile from "./logo_profile.svg";
import MedalIcon from "./medal.svg";
import MemeIcon from "./meme.svg";
import Message from "./message2.svg";
import Participants from "./participants.svg";
import PlusIcon from "./plus.svg";
import PremiumIcon from "./premium.svg";
import Price from "./price.svg";
import ProfileIcon from "./profile.svg";
import QuestionMark from "./question-mark.svg";
import ReferralIcon from "./referral.svg";
import RemoveIcon from "./remove.svg";
import RightIcon from "./right.svg";
import SadIcon from "./sad.svg";
import Save from "./save.svg";
import Search from "./search.svg";
import SecondIcon from "./second.svg";
import Settings from "./settings.svg";
import ShareIcon from "./share.svg";
import SnackbarCheck from "./snackbar_check.svg";
import Stars from "./stars.svg";
import TelegramIcon from "./telegram.svg";
import Text2Meme from "./text2meme.svg";
import TextToMeme from "./texttomeme.svg";
import ThirdIcon from "./third.svg";
import TickCircle from "./tick-circle.svg";
import TickIcon from "./tick.svg";
import Timer from "./timer.svg";
import TrendingIcon from "./trending.svg";
import TwitterIcon from "./twitter.svg";
import UserIcon from "./user.svg";
import walletIcon from "./wallet.svg";
import CloudUpload from "./cloud-upload.svg";
import Clock from "./clock.svg";
import RightArrow from "./right-arrow.svg";
import Invite from "./invite.svg";
import Close2 from "./close2.svg";
import PlayIcon from "./play.svg";

import NavigationHomeIcon from "./navigation/home.svg";
import NavigationFriendsIcon from "./navigation/friends.svg";
import NavigationMemeGptIcon from "./navigation/memegpt.svg";
import NavigationQuestIcon from "./navigation/quest.svg";
import NavigationGamesIcon from "./navigation/games.svg";
import NavigationTrendingIcon from "./navigation/trending.svg";
import HeartIcon from "./heart.svg";

const icons = {
  close2: Close2,
  invite: Invite,
  rightArrow: RightArrow,
  clock: Clock,
  questionMark: QuestionMark,
  news: Bulb,
  support: Message,
  removeBin: RemoveBin,
  help: Help,
  langauge: Language,
  cart: IconCart,
  delete: IconDelete,
  add: AddIcon,
  remove: RemoveIcon,
  check: IconCheck,
  telegram: TelegramIcon,
  twitter: TwitterIcon,
  plus: PlusIcon,
  wallet: walletIcon,
  share: ShareIcon,
  like: LikeIcon,
  profile: ProfileIcon,
  arrow: ArrowIcon,
  coin: CoinIcon,
  right: RightIcon,
  edit: EditIcon,
  meme: MemeIcon,
  referral: ReferralIcon,
  texttomeme: TextToMeme,
  imagetomeme: ImageRoMeme,
  user: UserIcon,
  dots: DotsIcon,
  medal: MedalIcon,
  crypto: CryptoIcon,
  indirect: IndirectIcon,
  first: FirstIcon,
  second: SecondIcon,
  third: ThirdIcon,
  sad: SadIcon,
  bitcoin: BitCoin,
  game: GameIcon,
  trending: TrendingIcon,
  copy: CopyIcon,
  close: CloseIcon,
  snackbarCheck: SnackbarCheck,
  imagePlus: ImagePlusIcon,
  bulb: BulbIcon,
  cancel: CancelIcon,
  premium: PremiumIcon,
  info: InfoIcon,
  tick: TickIcon,
  logo: Logo,
  threeDots: DotsIcon,
  settings: Settings,
  search: Search,
  loading: Loading,
  home: Home,
  stars: Stars,
  logoProfile: LogoProfile,
  timer: Timer,
  price: Price,
  image2meme: Image2Meme,
  text2meme: Text2Meme,
  participants: Participants,
  "arrow-right": ArrowRight,
  "tick-circle": TickCircle,
  "gallery-edit": GalleryEdit,
  "arrow-down": ArrowDown,
  "cloud-upload": CloudUpload,
  save: Save,

  "navigation/home": NavigationHomeIcon,
  "navigation/friends": NavigationFriendsIcon,
  "navigation/memegpt": NavigationMemeGptIcon,
  "navigation/quest": NavigationQuestIcon,
  "navigation/games": NavigationGamesIcon,
  "navigation/trending": NavigationTrendingIcon,

  play: PlayIcon,
  heart: HeartIcon,
};

export default icons;

export type IconType = keyof typeof icons;
