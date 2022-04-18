// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract PolygonERC721Mint is ERC721, Ownable {
    string public uri;
    
    uint public mintTokenId = 10000;  
    uint256 public constant BATCH_LIMIT = 10; 

    address public metadata;
    address public childChainManager = 0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa;

    mapping(address => bool) public managers;

    modifier onlyChildChainManager() {
        require(
            msg.sender == childChainManager, 
            '!childChainManager'
        );
        _;
    }

    modifier onlyManager() {
        require(
            managers[msg.sender], 
            'ERC721Mint: caller is not the manager'
        );
        _;
    }

    event WithdrawnBatch(address indexed user, uint256[] tokenIds);

    constructor(string memory _name, string memory _symbol, string memory _uri) ERC721 (_name, _symbol) {
        uri = _uri;

        managers[msg.sender] = true;
    }

    function _baseURI() 
        internal 
        view 
        override
        returns(string memory) 
    {
        return uri;
    }

    function _setURI(string memory _newURI) 
        external
        onlyOwner
        returns(bool) 
    {
        uri = _newURI;

        return true;
    }

    function _setMetadata(address _metadata) 
        public 
        onlyOwner 
        returns(bool) 
    {
        metadata = _metadata;

        return true;
    }

    function _backERC20(address _token, address _recepient)
        external 
        onlyOwner 
        returns(bool) 
    {
        IERC20(_token).transfer(_recepient, IERC20(_token).balanceOf(address(this)));

        return true;
    }

    function _backERC721(address _token, address _recepient, uint _tokenId)
        external 
        onlyOwner 
        returns(bool) 
    {
        IERC721(_token).transferFrom(address(this), _recepient, _tokenId);

        return true;
    }

     /**
     * @notice called when token is deposited on root chain
     * @dev Should be callable only by ChildChainManager
     * Should handle deposit by minting the required tokenId for user
     * Make sure minting is done only by this function
     * @param _user user address for whom deposit is being done
     * @param _depositData abi encoded tokenId
     */
    function deposit(address _user, bytes calldata _depositData)
        external
        onlyChildChainManager
    {
        // deposit single
        if (_depositData.length == 32) {
            uint256 _tokenId = abi.decode(_depositData, (uint256));

            _mint(_user, _tokenId);

        // deposit batch
        } else {
            uint256[] memory _tokenIds = abi.decode(_depositData, (uint256[]));
            uint256 length = _tokenIds.length;

            for (uint256 i; i < length; i++) {
                _mint(_user, _tokenIds[i]);
            }
        }
    }

    /**
     * @notice called when user wants to withdraw token back to root chain
     * @dev Should burn user's token. This transaction will be verified when exiting on root chain
     * @param _tokenId tokenId to withdraw
     */
    function withdraw(uint256 _tokenId) external {
        require(_tokenId < mintTokenId, "ChildERC721: EXCEEDS_TOKEN_LIMIT");
        require(_msgSender() == ownerOf(_tokenId), "ChildERC721: INVALID_TOKEN_OWNER");

        _burn(_tokenId);
    }

    /**
     * @notice called when user wants to withdraw multiple tokens back to root chain
     * @dev Should burn user's tokens. This transaction will be verified when exiting on root chain
     * @param _tokenIds tokenId list to withdraw
     */
    function withdrawBatch(uint256[] calldata _tokenIds) external {
        uint256 length = _tokenIds.length;

        require(_tokenIds[length-1] < mintTokenId, "ChildERC721: EXCEEDS_TOKEN_LIMIT");
        require(length <= BATCH_LIMIT, "ChildERC721: EXCEEDS_BATCH_LIMIT");

        for (uint256 i; i < length; i++) {
            uint256 _tokenId = _tokenIds[i];

            require(_msgSender() == ownerOf(_tokenId), string(abi.encodePacked("ChildERC721: INVALID_TOKEN_OWNER ", _tokenId)));

            _burn(_tokenId);
        }

        emit WithdrawnBatch(_msgSender(), _tokenIds);
    }

    function mint(address to) 
        external 
        onlyManager
        returns(uint) 
    {
        _mint(to, mintTokenId);

        mintTokenId++;

        return mintTokenId;
    }

}